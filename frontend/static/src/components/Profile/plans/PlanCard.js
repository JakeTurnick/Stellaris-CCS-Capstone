import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../Auth/AuthContextProvider";
import Cookies from "js-cookie";
import "./plan-card.css";

function PlanCard(props) {
	const { user } = useContext(AuthContext);
	const [editMode, setEditMode] = useState(false);
	const [plan, setPlan] = useState(props.plan);
	const [moon, setMoon] = useState();
	console.log({ plan });

	const handleInput = (e) => {
		const { name, value } = e.target;
		setPlan((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const deletePlan = async (e) => {
		e.preventDefault();
		const options = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify(plan),
		};
		const response = await fetch(
			`/api_v1/accs/user/plans/${plan.pk}/`,
			options
		);
		const data = await response.json();
		console.log({ data });
		props.getPlans();
		setEditMode(false);
	};

	const updatePlan = async (e) => {
		e.preventDefault();
		const options = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify(plan),
		};
		const response = await fetch(
			`/api_v1/accs/user/plans/${plan.pk}/`,
			options
		);
		const data = await response.json();
		console.log({ data });
		setEditMode(false);
		// props.getPlans();
	};

	useEffect(() => {
		getAstro();
	}, []);

	const getAstro = async (e) => {
		const KEY = process.env.REACT_APP_WEATHER_API_KEY;
		const WEATHER_BASE_URL = "https://api.weatherapi.com/v1";
		const WEATHER_PARAMS = `/astronomy.json?key=${KEY}&q=${user.default_zip}&dt=${plan.date}`;

		const weatherUrl = WEATHER_BASE_URL + WEATHER_PARAMS;
		// console.log("total weather URL", weatherUrl);

		const response = await fetch(weatherUrl);
		if (!response.ok) {
			throw new Error("could not fetch weather forecast", response);
		}
		const data = await response.json();
		console.log("weather", await data);
		const lat = data.location.lat;
		const lon = data.location.lon;
		getMoon(lat, lon, plan.date);
	};

	const getMoon = async (lat, lon, date) => {
		const options = {
			method: "POST",
			headers: {
				Authorization: JSON.stringify(process.env.REACT_APP_ASTRONOMY_API_KEY),
			},
			body: JSON.stringify({
				format: "png",
				style: {
					moonStyle: "default",
					backgroundStyle: "stars",
					backgroundColor: "black",
					headingColor: "white",
					textColor: "white",
				},
				observer: {
					latitude: parseFloat(lat),
					longitude: parseFloat(lon),
					date: date,
				},
				view: {
					type: "landscape-simple",
				},
			}),
		};
		const response = await fetch(
			"https://api.astronomyapi.com/api/v2/studio/moon-phase",
			options
		);

		if (!response.ok) {
			throw new Error("Could not retrieve astro info", response);
		}
		const data = await response.json();
		console.log("moon data: ", data.data);
		// setMoonSRC(data.data.imageUrl);
		const testSRC = await data.data.imageUrl;
		setMoon(await data.data.imageUrl);
		// console.log(moonSRC)
	};

	if (!moon) {
		return <div></div>;
	}
	return (
		<li>
			{editMode ? (
				<form onSubmit={updatePlan} className="plan-form">
					<label htmlFor="title">Title:</label>
					<input
						type="text"
						name="title"
						value={plan.title}
						onChange={handleInput}
						className="edit-plan-title"
					/>
					<label htmlFor="date">Date:</label>
					<input
						type="date"
						name="date"
						value={plan.date}
						onChange={handleInput}
						className="edit-plan-date"
					/>
					<label htmlFor="notes">Notes:</label>
					<textarea
						type="textarea"
						name="notes"
						value={plan.notes}
						onChange={handleInput}
						className="edit-plan-notes"
						rows="3"
					/>
					<div className="edit-plan-btns">
						{/* <button onClick={() => setEditMode(false)}>Preview</button> */}
						<button type="submit">Update</button>
					</div>
				</form>
			) : (
				<article className="plan-card">
					{/* <h2>I am a Plan card</h2> */}
					<h2 className="plan-title">{plan.title}</h2>
					<p className="plan-date">Date: {plan.date}</p>
					<p>Notes:</p>
					<p className="plan-notes">{plan.notes}</p>
					<img src={moon} className="plan-moon" />
					<button className="edit-plan-btn" onClick={() => setEditMode(true)}>
						Edit
					</button>
					<button onClick={deletePlan}>Delete</button>
					{/* <button onClick={getAstro}>Get astro</button> */}
				</article>
			)}
		</li>
	);
}

export default PlanCard;
