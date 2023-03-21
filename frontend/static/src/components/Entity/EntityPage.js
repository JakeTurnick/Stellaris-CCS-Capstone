import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Auth/AuthContextProvider";
import Cookies from "js-cookie";
import { nanoid } from "nanoid";
import StarList from "./StarList";
import StarItem from "./StarItem";
import ConstellationCard from "./cards/ConstellationCard";
import MeteorShowerCard from "./cards/MeteorShowerCard";
import EntityCard from "./cards/EntityCard";
import "./entity-page.css";

const INITIAL_SEARCH = {
	searchType: "star",
	searchBy: "name",
	searchText: "",
};
const SEARCH_TYPES = [
	"stars",
	"constellations",
	"comets",
	"meteor-showers",
	"planets",
];

function EntityPage(props) {
	// state for stars to display on page
	const [search, setSearch] = useState({ searchType: "constellations" });
	const [cards, setCards] = useState();
	const [stars, setStars] = useState();
	const [constellations, setConstellations] = useState();
	const [comets, setComets] = useState();
	const [meteorShowers, setMeteorShowers] = useState();

	// Form to get entities in data base
	// [Stars, Constellations, Meteor Showers, Comments, Planets, Human Craft]
	// Display entities as:
	// <"Search the sky:"/> Name, (related constellation if any), Location, Photo, Fun facts?
	// <"When can I see this?"/> Select entity to view if it's visible at (location, time/date)
	// <"Track this entity"/>

	// Use effect to grab users.trackedEntities & display them on load
	// A list of 'pre-searched' entities - click to view like <"when can I see this?"/>

	const searchInput = (e) => {
		const { name, value } = e.target;
		setSearch((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const searchEntity = async (e) => {
		e.preventDefault();
		const options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
		};
		console.log(search.searchType);

		let testText = search.searchText.split(" ");
		testText = testText.join("%20");
		console.log(testText);

		let response;
		if (!search.searchText) {
			console.log(`api_v1/heavens/${search.searchType}`);
			response = await fetch(`api_v1/heavens/${search.searchType}`);
		} else {
			console.log(
				`api_v1/heavens/${search.searchType}/${testText.toLowerCase()}`
			);
			response = await fetch(
				`api_v1/heavens/${search.searchType}/${testText.toLowerCase()}`
			);
		}

		if (!response.ok) {
			throw new Error("could not fetch entities");
		}

		const data = await response.json();
		console.log("entity search data", data);
		switch (search.searchType) {
			case "stars":
				setStars(data);
				break;
			case "constellations":
				setConstellations(data);
				break;
			case "meteor-showers":
				setMeteorShowers(data);
				break;
		}
		// setCards(data);
	};

	const find = async (type) => {
		const options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
		};
		const response = await fetch(`api_v1/heavens/${type}`);
		if (!response.ok) {
			throw new Error("could not fetch entities");
		}
		const data = await response.json();
		switch (type) {
			case "constellations":
				setConstellations(data);
				setSearch((prev) => ({
					...prev,
					searchType: "constellations",
				}));
				break;
			case "meteor-showers":
				setMeteorShowers(data);
				setSearch((prev) => ({
					...prev,
					searchType: "meteor-showers",
				}));
				break;
		}
	};

	const constellationsHTML = constellations?.map((card) => (
		<ConstellationCard
			name={card.name}
			entity={card}
			key={nanoid()}
			type={search.searchType}
			refresh={() => find("constellations")}
		/>
	));

	const showersHTML = meteorShowers?.map((card) => (
		<MeteorShowerCard
			name={card.name}
			entity={card}
			key={nanoid()}
			type={search.searchType}
			refresh={() => find("meteor-showers")}
		/>
	));

	return (
		<div>
			<h1>View common entities in the night sky</h1>
			<section className="entity-search">
				<nav className="tracked-nav">
					<button onClick={() => find("constellations")}>Constellations</button>
					<button onClick={() => find("meteor-showers")}>Meteor Showers</button>
				</nav>
			</section>
			{/* {search.searchType === "stars" ? (
				<div>
					<h3>Display stars</h3>
				</div>
			) : (
				<div></div>
			)} */}
			{search.searchType === "constellations" ? (
				<div>
					<section className="entity-ul">{constellationsHTML}</section>
				</div>
			) : (
				<div></div>
			)}
			{search.searchType === "meteor-showers" ? (
				<div>
					<section className="entity-ul">{showersHTML}</section>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
}

export default EntityPage;
