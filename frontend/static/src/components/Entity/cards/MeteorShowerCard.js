import "./card.css";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "../../../Auth/AuthContextProvider";
import { useNavigate } from "react-router-dom";

function MeteorShowerCard(props) {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	let capName = props.name.split(" ");
	// console.log("meteor shower:", { props });
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

	const untrackEntity = async () => {
		const payload = {
			meteorShower: props.entity.id,
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
		// console.log({ data });
		props.refresh();
	};

	return (
		<article className="shower-card">
			<h3>{capName}</h3>
			<p>Viewable on - {props.entity.date}</p>
			{props.entity.is_tracked ? (
				<div>
					<p>Currently favorited</p>
					<button onClick={untrackEntity}>Unfavorite?</button>
				</div>
			) : (
				<div>
					{user.username ? (
						<button onClick={trackEntity}>Favorite {capName}</button>
					) : (
						<button onClick={() => navigate("/login")}>
							Log in to track entity
						</button>
					)}
				</div>
			)}
		</article>
	);
}

export default MeteorShowerCard;
