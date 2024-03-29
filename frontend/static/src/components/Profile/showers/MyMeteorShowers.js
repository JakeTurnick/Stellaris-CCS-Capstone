// Import useEffect, useState
import { useEffect, useState } from "react";
import MyMeteorShowerCard from "./MyMeteorShowerCard";
import { nanoid } from "nanoid";
import "../tracking/tracked-entites.css";

function MyMeteorShowers(props) {
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
		const response = await fetch("api_v1/accs/user/meteor-showers/", options);
		const data = await response.json();
		console.log({ data });
		setEntities((prev) => ({
			...prev,
			meteorShowers: data.tracked_meteor_showers,
		}));
	};

	const showersHTML = entities?.meteorShowers?.map((card) => (
		<MyMeteorShowerCard
			name={card.name}
			entity={card}
			key={nanoid()}
			refresh={getEntites}
		/>
	));

	return (
		<article className="tracked-">
			{/* <h2>These are my tracked MeteorShowers:</h2> */}
			<div className="tracked-ul">{showersHTML}</div>
		</article>
	);
}

export default MyMeteorShowers;
