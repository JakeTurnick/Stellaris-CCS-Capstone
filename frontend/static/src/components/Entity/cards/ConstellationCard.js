import "./card.css";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "../../../Auth/AuthContextProvider";
import { useNavigate } from "react-router-dom";

function ConstellationCard(props) {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	let capName = props.name.split(" ");
	const newName = capName.map((name) => {
		const cap = name[0].toUpperCase();
		const ame = name.slice(1);
		return cap + ame;
	});
	capName = newName.join(" ");
	// console.log({ capName });

	const getChart = async () => {
		const data = {
			style: "default",
			observer: {
				latitude: 33.775867,
				longitude: -84.39733,
				date: "2023-03-23",
			},
			view: { type: "constellation", parameters: { constellation: "ori" } },
		};
	};

	const trackEntity = async () => {
		const payload = {
			constellation: props.entity.id,
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
		// console.log({ data });
		props.refresh();
	};

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
		const response = await fetch("/api_v1/accs/user/constellations/", options);
		const data = await response.json();
		// console.log({ data });
		props.refresh();
	};

	return (
		<article className="constellation-card">
			<h3>{capName}</h3>
			{props.entity.is_tracked ? (
				<div>
					<p>Currently tracking</p>
					<button onClick={untrackEntity}>Stop tracking?</button>
				</div>
			) : (
				<div>
					{user.username ? (
						<button onClick={trackEntity}>Track Entity</button>
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

export default ConstellationCard;
