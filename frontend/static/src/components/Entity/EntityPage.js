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
	const [search, setSearch] = useState(INITIAL_SEARCH);
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

	const constellationsHTML = constellations?.map((card) => (
		<ConstellationCard
			name={card.name}
			entity={card}
			key={nanoid()}
			type={search.searchType}
		/>
	));

	const showersHTML = meteorShowers?.map((card) => (
		<MeteorShowerCard
			name={card.name}
			entity={card}
			key={nanoid()}
			type={search.searchType}
		/>
	));

	return (
		<div>
			<h1>I am the Entity Page</h1>
			<section className="entity-search">
				<form onSubmit={searchEntity}>
					<h3>Search By:</h3>
					<section id="search-type">
						<div className="radio-option">
							<label htmlFor="stars">Stars</label>
							<input
								type="radio"
								id="stars"
								name="searchType"
								onClick={searchInput}
								value={"stars"}
							/>
							<br />
						</div>
						<div className="radio-option">
							<label htmlFor="const">Constellations</label>
							<input
								type="radio"
								id="const"
								name="searchType"
								onClick={searchInput}
								value={"constellations"}
							/>
							<br />
						</div>
						<div className="radio-option">
							<label htmlFor="mtshr">Meteor Showers</label>
							<input
								type="radio"
								id="mtshr"
								name="searchType"
								onClick={searchInput}
								value={"meteor-showers"}
							/>
							<br />
						</div>
						<div className="radio-option">
							<label htmlFor="comet">Commets</label>
							<input
								type="radio"
								id="comet"
								name="searchType"
								onClick={searchInput}
								value={"comets"}
							/>
							<br />
						</div>
						<div className="radio-option">
							<label htmlFor="plnt">Planets</label>
							<input
								type="radio"
								id="plnt"
								name="searchType"
								onClick={searchInput}
								value={"planets"}
							/>
							<br />
						</div>
						<div className="radio-option">
							<label htmlFor="plnt">Human Craft</label>
							<input
								type="radio"
								id="hcrft"
								name="searchType"
								onClick={searchInput}
								value={"hcrft"}
							/>
							<br />
						</div>
					</section>
					<section id="search-by">
						{/* <h3>Name or Date:</h3>
						<div className="radio-option">
							<label htmlFor="name">Search by Name</label>
							<input
								type="radio"
								id="name"
								name="searchBy"
								onClick={searchInput}
								value={"name"}
							/>
						</div> */}
						{/* <div className="radio-option">
							<label htmlFor="date">Search by Date (WIP)</label>
							<input
								type="radio"
								id="date"
								name="searchBy"
								onClick={searchInput}
								value={"date"}
								disabled
							/>
						</div> */}
					</section>
					<section id="search-text">
						<label htmlFor=""></label>
						<input
							type="text"
							id="searchText"
							name="searchText"
							onChange={searchInput}
							value={search.searchText}
							placeholder={`Leave blank for all available`}
						/>
					</section>
					<button type="submit">Search!</button>
				</form>
			</section>
			{search.searchType === "stars" ? (
				<div>
					<h3>Display stars</h3>
				</div>
			) : (
				<div></div>
			)}
			{search.searchType === "constellations" ? (
				<div>
					<h3>Display constellations</h3>
					<section>{constellationsHTML}</section>
				</div>
			) : (
				<div></div>
			)}
			{search.searchType === "meteor-showers" ? (
				<div>
					<h3>Display meteor showers</h3>
					<section>{showersHTML}</section>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
}

export default EntityPage;
