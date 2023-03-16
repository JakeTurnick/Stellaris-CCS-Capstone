import Cookies from "js-cookie";

function Testing() {
	const putTest = async () => {
		const payload = {
			constellation: "crazy const",
			abs_mag: "−3.64",
			app_mag: "1.97",
			// constellation: "Ursa Minor",
			dec: "+89° 15′ 50.9″",
			ly_dist: "431",
			name: "Polaris",
			ra: "02h 31m 47.08s",
			spec_class: "F7:Ib-IIv SB",
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
	return <button onClick={untrackEntity}>Test</button>;
}

export default Testing;
