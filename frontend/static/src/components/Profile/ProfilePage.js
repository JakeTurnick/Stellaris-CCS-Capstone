import MyConstellations from "./constellations/MyConstellations";
import MyMeteorShowers from "./showers/MyMeteorShowers";
import TrackedEntities from "./tracking/TrackedEntities";
import Plans from "./plans/Plans";
import EditProfile from "./EditProfile";
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthContextProvider";
import "./profile-page.css";

function ProfilePage(props) {
	const { isAuth, user } = useContext(AuthContext);
	const [view, setView] = useState();
	return (
		<div id="profile-page">
			{isAuth ? (
				<div>
					<h1>I am the profile page</h1>
					<nav className="profile-nav">
						<button className="a-btn" onClick={() => setView("tracked")}>
							My tracked list
						</button>
						<button className="a-btn" onClick={() => setView("plans")}>
							My plans list
						</button>
						<button className="a-btn" onClick={() => setView("edit")}>
							Edit my profile
						</button>
					</nav>
					{view === "tracked" ? <TrackedEntities /> : <div></div>}
					{view === "plans" ? <Plans /> : <div></div>}
					{view === "edit" ? <EditProfile /> : <div></div>}
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

export default ProfilePage;
