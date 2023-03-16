import { useContext } from "react";
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
import Testing from "./components/Testing/Testing";
import "./App.css";

function App() {
	const { isAuth } = useContext(AuthContext);

	return (
		<div className="App">
			<QAM />
			<Routes>
				<Route path="admin-entity" element={<AdminEntity />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="register" element={<RegisterPage />} />
				<Route path="testing" element={<Testing />} />
				{/* <Route path='home' element={<Home />} /> */}
				<Route path="weather" element={<NewWeatherPage />} />
				<Route path="entities" element={<EntityPage />} />
				<Route path="profile" element={<ProfilePage />} />
				{/* DO I REALLY NEED A PROTECTED ROUTE?? PROFILE IS THE ONLY ONE <Route path='/' element={<ProtectedRoutes />} > */}
				{/* home page */}
				{/* </Route> */}
			</Routes>
		</div>
	);
}

export default App;
