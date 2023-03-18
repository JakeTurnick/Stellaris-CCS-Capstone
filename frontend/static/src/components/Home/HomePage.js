import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Auth/AuthContextProvider";

// Getting current date
const today = new Date();
let cday = today.getDate().toString();
let cmonth = (today.getMonth() + 1).toString();
let cyear = today.getFullYear().toString();
// Padded 0's because format requirements
cday = String(cday).padStart(2, "0");
cmonth = String(cmonth).padStart(2, "0");
cyear = String(cyear).padStart(4, "0");
// Formatting full date
let date = `${cyear}-${cmonth}-${cday}`;
const todaysDate = date;
// console.log("current date", date)

function HomePage(props) {
	const { isAuth, user } = useContext(AuthContext);
	const [weatherForm, setWeatherForm] = useState();

	const getTodaysWeather = async (e) => {
		if (e) {
			e.preventDefault();
		}

		const KEY = process.env.REACT_APP_WEATHER_API_KEY;
		const WEATHER_BASE_URL = "http://api.weatherapi.com/v1";
		const WEATHER_PARAMS = `/current.json?key=${KEY}&q=${weatherForm.zip}&aqi=no`;

		const weatherUrl = WEATHER_BASE_URL + WEATHER_PARAMS;
		// console.log("total weather URL", weatherUrl);

		const response = await fetch(weatherUrl);
		if (!response.ok) {
			throw new Error("could not fetch weather forecast", response);
		}
		const data = await response.json();
		console.log("today's weather", await data);
		// setWeatherToday(await data);

		// setWeatherData(await data);
		// setWeatherData({
		// 	type: data.current.condition.text,
		// 	cloud: data.current.cloud,
		// 	feelsLike_f: data.current.feelslike_f,
		// 	temp_f: data.current.temp_f,
		// });
		// console.log("new weather object", weatherData);

		// Get Moon phase as well -
		const currDT = await data.location.localtime.split(" ");
		const currDate = currDT[0];

		const moonForm = {
			lat: data.location.lat,
			lon: data.location.lon,
			date: currDate,
		};
		const tonightsMoon = async () => {
			const options = {
				method: "POST",
				headers: {
					Authorization: JSON.stringify(
						process.env.REACT_APP_ASTRONOMY_API_KEY
					),
				},
				body: JSON.stringify({
					format: "png",
					style: {
						moonStyle: "default",
						backgroundStyle: "stars",
						backgroundColor: "black",
						headingColor: "white",
						textColor: "white",
					},
					observer: {
						latitude: parseFloat(moonForm.lat),
						longitude: parseFloat(moonForm.lon),
						date: moonForm.date,
					},
					view: {
						type: "landscape-simple",
					},
				}),
			};
			const response = await fetch(
				"https://api.astronomyapi.com/api/v2/studio/moon-phase",
				options
			);

			if (!response.ok) {
				throw new Error("Could not retrieve astro info", response);
			}
			const data = await response.json();
			// console.log("moon data: ", data.data)
			setMoonSRC(await data.data.imageUrl);
			// console.log(moonSRC)
		};
		tonightsMoon();
	};

	return (
		<div>
			<h1>I am the home page</h1>
		</div>
	);
}

export default HomePage;
