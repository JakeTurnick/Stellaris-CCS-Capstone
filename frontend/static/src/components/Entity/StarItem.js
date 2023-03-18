import Cookies from "js-cookie";

function StarItem(props) {
	// console.log("StarItem props", props);
	const star = props.star;

	// console.log("body", {
	// 	e_type: props.type,
	// 	name: star.name,
	// 	date: null,
	// 	ra: star.right_ascension,
	// 	dec: star.declination,
	// 	spec_class: star.spectral_class,
	// 	abs_mag: star.absolute_magnitude,
	// 	app_mag: star.apparent_magnitude,
	// 	ly_dist: star.distance_light_year,
	// });

	const postStar = async (e) => {
		console.log(star);
		let payload;

		if (props.type === "star") {
			payload = {
				name: star.name.toLowerCase(),
				constellation: star.constellation.toLowerCase(),
				date: null,
				right_ascension: star.right_ascension,
				declination: star.declination,
				spectral_class: star.spectral_class,
				absolute_magnitude: star.absolute_magnitude,
				apparent_magnitude: star.apparent_magnitude,
				distance_light_year: star.distance_light_year,
			};
		} else if (props.type === "constellation") {
			payload = {
				star,
			};
		}
		console.log({ payload });

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify({
				e_type: "star",
				name: star.name,
				date: null,
				ra: star.right_ascension,
				dec: star.declination,
				spec_class: star.spectral_class,
				abs_mag: star.absolute_magnitude,
				app_mag: star.apparent_magnitude,
				ly_dist: star.distance_light_year,
			}),
		};

		// const response = await fetch("api_v1/heavens/add-entity/", options);
		// const data = await response.json();
		// console.log("star post data", data);
	};

	return (
		<li>
			Name: {star.name} | Constellation: {star.constellation} | RA:{" "}
			{star.right_ascension} | DEC: {star.declination} |
			<button onClick={postStar}>Add {star.name} to DB</button>
		</li>
	);
}

export default StarItem;
