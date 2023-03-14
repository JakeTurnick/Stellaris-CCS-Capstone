import "./card.css";

function ConstellationCard(props) {
	let capName = props.name.split(" ");
	console.log({ capName });
	const newName = capName.map((name) => {
		const cap = name[0].toUpperCase();
		const ame = name.slice(1);
		return cap + ame;
	});
	capName = newName.join(" ");
	console.log({ capName });

	return (
		<article className="constellation-card">
			<h4>I am a constellation card</h4>
			<h3>{capName}</h3>
			<button>Track Entity</button>
		</article>
	);
}

export default ConstellationCard;
