import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContextProvider";
import "./QAM.css";

function QAM(props) {
	const navigate = useNavigate();
	const { isAuth, user, logout } = useContext(AuthContext);
	return (
		<div id="QAM">
			<h1>Stellaris</h1>
			<h2>Welcome - {user.username ? user.username : "to Stellaris"}</h2>
			<nav id="main-nav">
				{/* <button onClick={() => logout()}>My Profile</button> */}
				<button onClick={() => navigate("/")}>Home</button>
				<button onClick={() => navigate("/weather")}>Weather</button>
				<button onClick={() => navigate("/entities")}>Celestial Lookup</button>
				{isAuth ? (
					<button onClick={() => navigate("/profile")}>My Profile</button>
				) : (
					<div></div>
				)}
				{user.is_superuser ? (
					<button onClick={() => navigate("/admin-entity")}>Admin Panel</button>
				) : (
					<div></div>
				)}
			</nav>
			{isAuth ? (
				<button onClick={() => logout()}>Sign out</button>
			) : (
				<nav id="footer-nav">
					<button onClick={() => navigate("/login")}>Login</button>
					<button onClick={() => navigate("/register")}>Sign up</button>
				</nav>
			)}
		</div>
	);
}

export default QAM;
