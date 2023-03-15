import Cookies from "js-cookie";

function Testing() {
	const putTest = async () => {
		const payload = {
			constellation: 33,
		};
		const options = {
			method: "PUT",
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
