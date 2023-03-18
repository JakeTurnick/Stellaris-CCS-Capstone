import "./card.css";
import Cookies from "js-cookie";

function MeteorShowerCard(props) {
	let capName = props.name.split(" ");
	console.log("meteor shower:", { props });
	// console.log({ capName });
	const newName = capName.map((name) => {
		const cap = name[0].toUpperCase();
		const ame = name.slice(1);
		return cap + ame;
	});
	capName = newName.join(" ");
	// console.log({ capName });

	const trackEntity = async () => {
		const payload = {
			meteorShower: props.entity.id,
		};
		const options = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify(payload),
		};
		const response = await fetch("/api_v1/accs/user/meteor-showers/", options);
		const data = await response.json();
		console.log({ data });
	};

	return (
		<article className="constellation-card">
			<h4>I am a meteor shower card</h4>
			<h3>{capName}</h3>
			<button onClick={trackEntity}>Track Entity</button>
		</article>
	);
}

export default MeteorShowerCard;
