import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContextProvider";
import "./QAM.css";

function QAM(props) {
	const navigate = useNavigate();
	const { isAuth, user, logout } = useContext(AuthContext);

	const logOut = () => {
		logout();
		props.closePane();
	};
	const logIn = () => {
		navigate("/login");
		props.closePane();
	};
	const register = () => {
		navigate("/register");
		props.closePane();
	};

	const goHome = () => {
		navigate("/");
		props.closePane();
	};
	const goWeather = () => {
		navigate("/weather");
		props.closePane();
	};
	const goEntities = () => {
		navigate("/entities");
		props.closePane();
	};
	const goProfile = () => {
		navigate("/profile");
		props.closePane();
	};
	const goTracked = () => {
		navigate("/tracked");
		props.closePane();
	};
	const goPlans = () => {
		navigate("/plans");
		props.closePane();
	};
	const goAdminEntities = () => {
		navigate("/admin-entity");
		props.closePane();
	};

	return (
		<div id="QAM">
			<h1>Stellaris</h1>
			<h2>Welcome - {user.username ? user.username : "to Stellaris"}</h2>
			<nav id="main-nav">
				{/* <button onClick={() => logout()}>My Profile</button> */}
				<button onClick={() => goHome()}>Home</button>
				<button onClick={() => goWeather()}>Weather</button>
				<button onClick={() => goEntities()}>Celestial Lookup</button>
				{isAuth ? (
					<div id="profile-nav">
						<button onClick={() => goProfile()}>My Profile</button>
						<button onClick={() => goTracked()}>Favorite Celestials</button>
						<button onClick={() => goPlans()}>My Plans</button>
					</div>
				) : (
					<div></div>
				)}
				{user.is_superuser ? (
					<button onClick={() => goAdminEntities()}>Admin Panel</button>
				) : (
					<div></div>
				)}
			</nav>
			{isAuth ? (
				<button id="sign-out-btn" onClick={() => logOut()}>
					Sign out
				</button>
			) : (
				<nav id="footer-nav">
					<button onClick={() => logIn()}>Login</button>
					<button onClick={() => register()}>Sign up</button>
				</nav>
			)}
		</div>
	);
}

export default QAM;
