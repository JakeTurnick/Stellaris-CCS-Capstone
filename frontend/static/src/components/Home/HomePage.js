import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Auth/AuthContextProvider";
import "./home-page.css"



function HomePage(props) {
	const { isAuth, user } = useContext(AuthContext);
	const [weatherForm, setWeatherForm] = useState();

	return (
		<div>
			<h1>Welcome to Stellaris!</h1>

			<article id="about">
				<h2>What is Stellaris?</h2>
				<p>
					Stellaris is a star gazing assistant that helps you plan a night to view the heavens above.
					Not every night is a good night to view, and not every night has the event you're looking for 
					- Stellaris is here to help!
				</p>
			</article>

			<article id="mission">
				<h2>Mission & Purpose</h2>
				<p id="mission-intro">
					As an amateur star gazer I found it quite difficult to stay on top of this hobby.
					You have to keep track of when a given planet will be visible, when a meteor shower or commet comes around,
					if the current weather even allows you to see past our troposphere (where weather occurs).
					Not the mention what phase the Moon is in and if it will outshine what you're looking for...
					<br />
					<br />
					<span id="too-much">It's too much!</span>
				</p>
				<p>
					We try to simplify this process as much as possible by keeping a collection of common entities
					(which can be found in <a className="text-link" onClick={() => alert(alert)}>Celestial Lookup</a>)
					and allowing you to track them or make you own <a className="text-link" onClick={() => alert(alert)}>plans</a>
				</p>

			</article>
			
		</div>
	);
}

export default HomePage;


// // Getting current date
// const today = new Date();
// let cday = today.getDate().toString();
// let cmonth = (today.getMonth() + 1).toString();
// let cyear = today.getFullYear().toString();
// // Padded 0's because format requirements
// cday = String(cday).padStart(2, "0");
// cmonth = String(cmonth).padStart(2, "0");
// cyear = String(cyear).padStart(4, "0");
// // Formatting full date
// let date = `${cyear}-${cmonth}-${cday}`;
// const todaysDate = date;
// // console.log("current date", date)



// const getTodaysWeather = async (e) => {
// 	if (e) {
// 		e.preventDefault();
// 	}

// 	const KEY = process.env.REACT_APP_WEATHER_API_KEY;
// 	const WEATHER_BASE_URL = "http://api.weatherapi.com/v1";
// 	const WEATHER_PARAMS = `/current.json?key=${KEY}&q=${weatherForm.zip}&aqi=no`;

// 	const weatherUrl = WEATHER_BASE_URL + WEATHER_PARAMS;
// 	// console.log("total weather URL", weatherUrl);

// 	const response = await fetch(weatherUrl);
// 	if (!response.ok) {
// 		throw new Error("could not fetch weather forecast", response);
// 	}
// 	const data = await response.json();
// 	console.log("today's weather", await data);
// 	// setWeatherToday(await data);

// 	// setWeatherData(await data);
// 	// setWeatherData({
// 	// 	type: data.current.condition.text,
// 	// 	cloud: data.current.cloud,
// 	// 	feelsLike_f: data.current.feelslike_f,
// 	// 	temp_f: data.current.temp_f,
// 	// });
// 	// console.log("new weather object", weatherData);

// 	// Get Moon phase as well -
// 	const currDT = await data.location.localtime.split(" ");
// 	const currDate = currDT[0];

// 	const moonForm = {
// 		lat: data.location.lat,
// 		lon: data.location.lon,
// 		date: currDate,
// 	};
// 	const tonightsMoon = async () => {
// 		const options = {
// 			method: "POST",
// 			headers: {
// 				Authorization: JSON.stringify(
// 					process.env.REACT_APP_ASTRONOMY_API_KEY
// 				),
// 			},
// 			body: JSON.stringify({
// 				format: "png",
// 				style: {
// 					moonStyle: "default",
// 					backgroundStyle: "stars",
// 					backgroundColor: "black",
// 					headingColor: "white",
// 					textColor: "white",
// 				},
// 				observer: {
// 					latitude: parseFloat(moonForm.lat),
// 					longitude: parseFloat(moonForm.lon),
// 					date: moonForm.date,
// 				},
// 				view: {
// 					type: "landscape-simple",
// 				},
// 			}),
// 		};
// 		const response = await fetch(
// 			"https://api.astronomyapi.com/api/v2/studio/moon-phase",
// 			options
// 		);

// 		if (!response.ok) {
// 			throw new Error("Could not retrieve astro info", response);
// 		}
// 		const data = await response.json();
// 		// console.log("moon data: ", data.data)
// 		setMoonSRC(await data.data.imageUrl);
// 		// console.log(moonSRC)
// 	};
// 	tonightsMoon();
// };
