import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./Auth/AuthContextProvider";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AdminEntity from "./components/Entity/AdminEntity";
import QAM from "./components/QAM/QAM";
import LoginPage from "./Auth/LoginPage";
import RegisterPage from "./Auth/Register";
import WeatherPage from "./components/Weather/WeatherPage";
import NewWeatherPage from "./components/Weather/newWeatherPage";
import EntityPage from "./components/Entity/EntityPage";
import ProfilePage from "./components/Profile/ProfilePage";
import TrackedEntities from "./components/Profile/tracking/TrackedEntities";
import Plans from "./components/Profile/plans/Plans";
import Testing from "./components/Testing/Testing";
import AltitudeCalc from "./components/Testing/AltitudeCalc";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

const bars = <FontAwesomeIcon className="open-qam" icon={faBars} />;
const close = <FontAwesomeIcon className="close-qam" icon={faX} />;

function App() {
	const { isAuth, user } = useContext(AuthContext);
	const [state, setState] = useState({ isPaneOpenLeft: false });

	return (
		<div className="App">
			{/* <script
				src="https://kit.fontawesome.com/ff4418d11d.js"
				crossOrigin="anonymous"
			></script> */}
			<div style={{ marginTop: "32px" }}>
				<button
					className="qam-btn"
					onClick={() => setState({ isPaneOpenLeft: true })}
				>
					{bars}
				</button>
			</div>
			<SlidingPane
				closeIcon={<div id="close-qam">{close}</div>}
				isOpen={state.isPaneOpenLeft}
				title="Stellaris"
				subtitle={
					user.username
						? `Welcome - ${user.username}`
						: "Log in or Sign up below!"
				}
				className="left-pane"
				from="left"
				width="300px"
				onRequestClose={() => setState({ isPaneOpenLeft: false })}
			>
				<QAM closePane={() => setState({ isPaneOpenLeft: false })} />
			</SlidingPane>
			{/* <QAM /> */}
			<Routes>
				<Route path="admin-entity" element={<AdminEntity />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="register" element={<RegisterPage />} />
				{/* <Route path="/" element={<div>Home</div>} /> */}
				<Route path="weather" element={<NewWeatherPage />} />
				<Route path="entities" element={<EntityPage />} />
				<Route path="profile" element={<ProfilePage />} />
				<Route path="tracked" element={<TrackedEntities />} />
				<Route path="plans" element={<Plans />} />
				<Route path="testing" element={<Testing />} />
				<Route path="alt" element={<AltitudeCalc />} />
				{/* DO I REALLY NEED A PROTECTED ROUTE?? PROFILE IS THE ONLY ONE <Route path='/' element={<ProtectedRoutes />} > */}
				{/* home page */}
				{/* </Route> */}
			</Routes>
			<img
				id="treeline"
				src="frontend/static/src/media/treeline-silhouette.png"
				alt=""
			/>
		</div>
	);
}

export default App;
