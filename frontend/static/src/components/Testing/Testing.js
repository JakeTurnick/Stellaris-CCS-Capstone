import Cookies from "js-cookie";

function Testing() {
	const putTest = async () => {
		// # constellation
		// # right_ascension
		// # declination
		// # spectral_class
		// # absolute_magnitude
		// # apparent_magnitude
		// # distance_light_year
		const payload = {
			constellation: "another crazy const",
			absolute_magnitude: `−3.64`,
			apparent_magnitude: "1.97",
			// constellation: "Ursa Minor",
			declination: `+89° 15′ 50.9″`,
			distance_light_year: "431",
			name: "Something",
			right_ascension: "02h 31m 47.08s",
			spectral_class: "F7:Ib-IIv SB",
		};
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify(payload),
		};
		const response = await fetch("/api_v1/heavens/stars/add/", options);
		const data = await response.json();
		console.log({ data });
	};
	const untrackEntity = async () => {
		const payload = {
			constellation: 3,
		};
		const options = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify(payload),
		};
		const response = await fetch("/api_v1/accs/user/constellations/", options);
		const data = await response.json();
		console.log({ data });
	};
	return <button onClick={putTest}>Test</button>;
}

export default Testing;
