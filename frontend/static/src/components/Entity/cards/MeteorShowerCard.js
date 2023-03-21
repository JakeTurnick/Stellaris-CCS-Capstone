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
		// console.log({ data });
		props.refresh();
	};

	return (
		<article className="shower-card">
			<h3>{capName}</h3>
			<p>Viewable on - {props.entity.date}</p>
			{props.entity.is_tracked ? (
				<div>
					<p>This is already tracked</p>
					<button>Untrack</button>
				</div>
			) : (
				<div>
					<button onClick={trackEntity}>Track Entity</button>
				</div>
			)}
		</article>
	);
}

export default MeteorShowerCard;
