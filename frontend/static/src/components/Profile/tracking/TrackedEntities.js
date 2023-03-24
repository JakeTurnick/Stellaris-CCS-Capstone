import MyConstellations from "../constellations/MyConstellations";
import MyMeteorShowers from "../showers/MyMeteorShowers";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Auth/AuthContextProvider";
import "./tracked-entites.css";

function TrackedEntities(props) {
	const { isAuth, user } = useContext(AuthContext);
	const [view, setView] = useState("constellations");
	return (
		<div className="tracked-page">
			{isAuth ? (
				<div>
					<h1>{user.username}'s Favorite Celestials</h1>
					<nav className="tracked-nav">
						<button onClick={() => setView("constellations")}>
							Constellations
						</button>
						<button onClick={() => setView("meteor-showers")}>
							Meteor Showers
						</button>
					</nav>
					{view === "constellations" ? <MyConstellations /> : <div></div>}
					{view === "meteor-showers" ? <MyMeteorShowers /> : <div></div>}
				</div>
			) : (
				<div>
					<h1>No profile</h1>
					<p>
						If you are seeing this - you need to <a href="/login">Log in</a> or{" "}
						<a href="/signup">Sign up</a>
					</p>
				</div>
			)}
		</div>
	);
}

export default TrackedEntities;
