import { useContext, useState } from "react";
import { AuthContext } from "../../../Auth/AuthContextProvider";
import PlanCard from "./PlanCard";
import { nanoid } from "nanoid";

function Plans(props) {
	const { isAuth, user } = useContext(AuthContext);
	const [plans, setPlans] = useState();

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
		<PlanCard plan={plan} key={nanoid()} />
	));

	return (
		<div>
			<h1>I am the plans page</h1>
			<button onClick={getPlans}>get plans</button>
            <ul>
                {plansHTML}
            </ul>
		</div>
	);
}

export default Plans;
