import MyConstellations from "../constellations/MyConstellations";
import MyMeteorShowers from "../showers/MyMeteorShowers";
import { useContext } from "react";
import { AuthContext } from "../../../Auth/AuthContextProvider";

function TrackedEntities(props) {
	const { isAuth, user } = useContext(AuthContext);
	return (
		<div>
			{isAuth ? (
				<div>
					<h1>I am the profile entites page</h1>
					<MyConstellations />
					<MyMeteorShowers />
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
