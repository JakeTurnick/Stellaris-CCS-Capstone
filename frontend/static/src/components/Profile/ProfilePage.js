import MyConstellations from "./constellations/MyConstellations";
import MyMeteorShowers from "./showers/MyMeteorShowers";
import TrackedEntities from "./TrackedEntities";
import Plans from "./plans/Plans";
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthContextProvider";

function ProfilePage(props) {
	const { isAuth, user } = useContext(AuthContext);
    const [view, setView] = useState();
	return (
		<div>
			{isAuth ? (
				<div>
					<h1>I am the profile page</h1>
                    <nav>
                        <button onClick={() => setView("tracked")} >My tracked list</button>
                        <button onClick={() => setView("plans")}>My plans list</button>
                        <button></button>
                    </nav>
                    { view === "tracked" ? (
                        <TrackedEntities />
                    ) : (
                        <div></div>
                    )}
                    { view === "plans" ? (
                        <Plans />
                    ) : (
                        <div></div>
                    )}

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
