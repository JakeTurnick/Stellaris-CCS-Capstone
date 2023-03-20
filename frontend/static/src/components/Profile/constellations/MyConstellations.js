// Import useEffect, useState
import { useEffect, useState } from "react";
import MyConstellationCard from "./MyConstellationCard";
import { nanoid } from "nanoid";
import "../tracking/tracked-entites.css";

function MyConstellations(props) {
	const [entities, setEntities] = useState({});
	useEffect(() => {
		getEntites();
	}, []);

	const getEntites = async () => {
		const options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch("api_v1/accs/user/constellations/", options);
		const data = await response.json();
		console.log({ data });
		setEntities((prev) => ({
			...prev,
			constellations: data.tracked_constellations,
		}));
	};

	const constellationsHTML = entities?.constellations?.map((card) => (
		<MyConstellationCard
			name={card.name}
			entity={card}
			key={nanoid()}
			refresh={getEntites}
		/>
	));

	return (
		<article>
			<h2>These are my tracked Constellations:</h2>
			<div className="tracked-ul">{constellationsHTML}</div>
		</article>
	);
}

export default MyConstellations;
