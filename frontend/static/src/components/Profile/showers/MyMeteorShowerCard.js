import "../../Entity/cards/card.css";
import Cookies from "js-cookie";

function MyMeteorShowerCard(props) {
	console.log({ props });
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

	const untrackEntity = async () => {
		const payload = {
			constellation: props.entity.id,
		};
		const options = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify(payload),
		};
		const response = await fetch("/api_v1/accs/user/meteor-showers/", options);
		const data = await response.json();
		console.log({ data });
		props.refresh();
	};

	return (
		<article className="constellation-card">
			<h3>{capName}</h3>
			<p>Viewable on - {props.entity.date}</p>
			<button onClick={untrackEntity}>Unfavorite</button>
		</article>
	);
}

export default MyMeteorShowerCard;
