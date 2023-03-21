import MyConstellations from "./constellations/MyConstellations";
import MyMeteorShowers from "./showers/MyMeteorShowers";
import TrackedEntities from "./tracking/TrackedEntities";
import Plans from "./plans/Plans";
import EditProfile from "./EditProfile";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthContextProvider";
import "./profile-page.css";

function ProfilePage(props) {
	const { isAuth, user } = useContext(AuthContext);
	const [view, setView] = useState();
	const navigate = useNavigate();
	return (
		<div id="profile-page">
			{isAuth ? (
				<div>
					<EditProfile />
					{/* <nav className="profile-nav">
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
					{view === "edit" ? <EditProfile /> : <div></div>} */}
				</div>
			) : (
				<div>
					<h1>No profile</h1>
					<p>
						If you are seeing this - you need to{" "}
						<a className="no-profile" onClick={() => navigate("/login")}>
							Log in
						</a>{" "}
						or{" "}
						<a className="no-profile" onClick={() => navigate("/register")}>
							Sign up
						</a>
					</p>
				</div>
			)}
		</div>
	);
}

export default ProfilePage;
