import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../Auth/AuthContextProvider";
import PlanCard from "./PlanCard";
import { nanoid } from "nanoid";
import Cookies from "js-cookie";
import "./plan-card.css";

const INITIAL_PLAN = {
	title: "",
	date: "",
	notes: "",
};

function Plans(props) {
	const { isAuth, user } = useContext(AuthContext);
	const [plans, setPlans] = useState();
	const [newPlan, setNewPlan] = useState(INITIAL_PLAN);
	const [create, setCreate] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify(newPlan),
		};
		const response = await fetch(`/api_v1/accs/user/add-plan/`, options);
		const data = await response.json();
		console.log({ data });
		setCreate(false);
	};
	const handleInput = (e) => {
		const { name, value } = e.target;
		setNewPlan((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	useEffect(() => {
		getPlans();
	}, []);

	const getPlans = async () => {
		const options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch("/api_v1/accs/user/plans/", options);
		const data = await response.json();
		console.log({ data });
		setPlans(data);
	};

	const plansHTML = plans?.map((plan) => (
		<PlanCard plan={plan} key={nanoid()} getPlans={getPlans} />
	));

	return (
		<div id="plans-page">
			<h1>{user.username}'s Plans</h1>
			<button onClick={() => setCreate(true)}>Create new Plan</button>
			{create ? (
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="">Title:</label>
						<input
							type="text"
							name="title"
							value={newPlan.title}
							onChange={handleInput}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="">Date:</label>
						<input
							type="date"
							name="date"
							value={newPlan.date}
							onChange={handleInput}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="">Notes:</label>
						<input
							type="text"
							name="notes"
							value={newPlan.notes}
							onChange={handleInput}
						/>
					</div>
					<button type="submit">Submit new plan</button>
				</form>
			) : (
				<div>
					{/* <button onClick={getPlans}>get plans</button> */}
					<ul className="plan-list">{plansHTML}</ul>
				</div>
			)}
		</div>
	);
}

export default Plans;
