import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Auth/AuthContextProvider";
import WeatherWidgit from "./WeatherWidgit";
import TodaysWeatherCard from "./TodaysWeatherCard";
import WeeklyWeatherCard from "./WeeklyWeatherCard";
import { nanoid } from "nanoid";

const INITIAL_ZIP = "29671";

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

const INITIAL_WEATHER = {
	zip: "29671",
	date: date,
};
const INITIAL_MP = {
	lon: -84.39733,
	lat: 33.775867,
	date: date,
	view: "portrait-simple",
};

function WeatherPage(props) {
	const { isAuth, user } = useContext(AuthContext);
	const [zip, setZip] = useState(INITIAL_ZIP);
	const [view, setView] = useState("today");
	// LATER (asky mady) -> user.defaultZip
	const [moonForm, setMoonForm] = useState(INITIAL_MP);
	const [moonSRC, setMoonSRC] = useState("");
	const [weatherForm, setWeatherForm] = useState(INITIAL_WEATHER);
	const [weatherData, setWeatherData] = useState({});
	const [weatherToday, setWeatherToday] = useState({});
	const [weatherWeek, setWeatherWeek] = useState({});
	const [weatherLookup, setWeatherLookup] = useState({});

	const moonInput = (e) => {
		const { name, value } = e.target;
		setMoonForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const weatherInput = (e) => {
		const { name, value } = e.target;
		setWeatherForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	useEffect(() => {
		console.log({ user });
		if (user) {
			setWeatherForm((prev) => ({
				...prev,
				zip: user.default_zip,
			}));
		}
		console.log("initial weather submit");
		weatherSubmit();
	}, []);

	const weatherSubmit = async (e) => {
		if (e) {
			e.preventDefault();
		}

		const KEY = process.env.REACT_APP_WEATHER_API_KEY;
		const WEATHER_BASE_URL = "http://api.weatherapi.com/v1";
		let WEATHER_PARAMS;
		switch (view) {
			case "today":
				console.log("it's today");
				WEATHER_PARAMS = `/current.json?key=${KEY}&q=${weatherForm.zip}&aqi=no`;
				break;
			case "week":
				console.log("it's the week");
				WEATHER_PARAMS = `/forecast.json?key=${KEY}&q=${weatherForm.zip}&days=10&aqi=no&alerts=no`;
				break;
			case "lookup":
				console.log("it's a lookup");
				WEATHER_PARAMS = `/future.json?key=${KEY}&q=${weatherForm.zip}&dt=${weatherForm.date}`;
				break;
		}

		const weatherUrl = WEATHER_BASE_URL + WEATHER_PARAMS;
		console.log("total weather URL", weatherUrl);

		const response = await fetch(weatherUrl);
		if (!response.ok) {
			throw new Error("could not fetch weather forecast", response);
		}
		const data = await response.json();
		console.log("weather data", await data);

		switch (view) {
			case "today":
				console.log("today's weather", data);
				setWeatherToday(await data);
				break;
			case "week":
				console.log("this weeks's weather", data);
				setWeatherWeek(await data);
				break;
			case "lookup":
				console.log("lookup's weather", data);
				setWeatherLookup(await data);
				break;
		}

		setWeatherData(await data);
		// setWeatherData({
		// 	type: data.current.condition.text,
		// 	cloud: data.current.cloud,
		// 	feelsLike_f: data.current.feelslike_f,
		// 	temp_f: data.current.temp_f,
		// });
		console.log("new weather object", weatherData);

		// Get Moon phase as well -
		const currDT = await data.location.localtime.split(" ");
		const currDate = currDT[0];

		setMoonForm((prev) => ({
			...prev,
			lat: data.location.lat,
			long: data.location.lon,
			date: currDate,
		}));
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

	const mpSubmit = async (e) => {
		e.preventDefault();

		const options = {
			method: "POST",
			headers: {
				Authorization: JSON.stringify(process.env.REACT_APP_ASTRONOMY_API_KEY),
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

	const getMoon = async (lat, lon, date) => {
		const options = {
			method: "POST",
			headers: {
				Authorization: JSON.stringify(process.env.REACT_APP_ASTRONOMY_API_KEY),
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
					latitude: parseFloat(lat),
					longitude: parseFloat(lon),
					date: date,
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
		return await data.data.imageUrl;
		// console.log(moonSRC)
	};

	const getToday = () => {
		setView("today");
		setWeatherForm((prev) => ({
			...prev,
			date: todaysDate,
		}));
		weatherSubmit();
	};

	const getWeek = () => {
		setView("week");
	};

	// useEffect(() => {
	//     console.log(weatherData.forecast?.forecastday)
	// }, [weatherData])
	const weekForecastHTML = weatherWeek.forecast?.forecastday.map((day) => {
		// console.log(day.date)
		// console.log("forcast day:", day)
		// let avgCloud
		// day.hour.forEach(hr => avgCloud += hr.cloud)
		// // avgCloud += hr.cloud
		// console.log("avg cloud", avgCloud)
		// avgCloud = avgCloud/24
		// console.log(avgCloud)
		return (
			<WeeklyWeatherCard
				key={nanoid()}
				date={day.date}
				type={day.day.condition.text}
				// cloud={avgCloud}
				// feelsLike_f={day.avgtemp_f}
				avgtemp_f={day.avgtemp_f}
				moonSRC={() =>
					getMoon(
						weatherData.location.lat,
						weatherData.location.lon,
						(date = day.date)
					)
				}
			/>
		);
	});

	// Current weather - pull from default zip, default to today's date
	// Weather by date/location - change date/location a pull weather
	// Events on that day
	// This could be user plans/trackedEvents
	return (
		<div>
			<h1>View weather for:</h1>
			<ul id="weather-view-choice">
				<li>
					<button onClick={getToday} value="today">
						Today
					</button>
				</li>
				<li>
					<button onClick={getWeek} value="week">
						This week
					</button>
				</li>
				<li>
					<button onClick={() => setView("lookup")} value="lookup">
						Date lookup
					</button>
				</li>
			</ul>
			<h3>Current view: {view}</h3>
			{view == "today" ? (
				<div className="weather-today">
					<h1>Today's view</h1>
					<form onSubmit={weatherSubmit}>
						<label htmlFor="zip">Zip code:</label>
						<input
							type="number"
							name="zip"
							min="0"
							max="99999"
							value={weatherForm.zip}
							onChange={weatherInput}
						/>
						<button type="submit">Get weather</button>
					</form>
					{/* <TodaysWeatherCard
                        date={weatherData.current.last_updated}
                        type={weatherData.current.condition.text}
                        cloud={weatherData.current.cloud}
                        feelsLike_f={weatherData.current.feelsLike_f}
                        temp_f={weatherData.current.temp_f}
                        weatherData={weatherData} weatherForm={weatherForm} moonSRC={moonSRC} /> */}
				</div>
			) : view == "week" ? (
				<div className="weather-week">
					<h1>This week's weather</h1>
					<form onSubmit={weatherSubmit}>
						<label htmlFor="zip">Zip code:</label>
						<input
							type="number"
							name="zip"
							min="0"
							max="99999"
							value={weatherForm.zip}
							onChange={weatherInput}
						/>
						<button type="submit">Get weather</button>
					</form>
					{weekForecastHTML}
					{/* <WeatherCard
                        date={weatherData.location.localtime}
                        type={weatherData.current.condition.text}
                        cloud={weatherData.current.cloud}
                        feelsLike_f={weatherData.current.feelsLike_f}
                        tem_fp={weatherData.current.temp_f}
                        // weatherData={weatherData}
                        // weatherForm={weatherForm}
                        moonSRC={moonSRC}
                         /> */}
					{/* type: data.current.condition.text,
                        cloud: data.current.cloud,
                        feelsLike_f: data.current.feelslike_f,
                        temp_f: data.current.temp_f, */}
				</div>
			) : view == "lookup" ? (
				<h1>Look up weather</h1>
			) : (
				<div></div>
			)}
			<section id="admin-weather-form">
				<h2>Weather:</h2>
				<form onSubmit={weatherSubmit}>
					<label htmlFor="zip">Zip code:</label>
					<input
						type="number"
						name="zip"
						min="0"
						max="99999"
						value={weatherForm.zip}
						onChange={weatherInput}
					/>
					<label htmlFor="date">For date</label>
					<input
						type="date"
						name="date"
						value={weatherForm.date}
						onChange={weatherInput}
					/>
					<button type="submit">Get weather</button>
				</form>
			</section>

			{/* <section id="admin-moon-form">
				<h2>Moon phase:</h2>
				<form onSubmit={mpSubmit}>
					<label htmlFor="lon">Longitutde</label>
					<input
						type="number"
						name="lon"
						min="-180"
						max="180"
						step=".0000001"
						value={moonForm.lon}
						onChange={moonInput}
					/>

					<label htmlFor="lat">Latitude</label>
					<input
						type="number"
						name="lat"
						min="-90"
						max="90"
						step=".0000001"
						value={moonForm.lat}
						onChange={moonInput}
					/>

					<label htmlFor="date">From date</label>
					<input
						type="date"
						name="date"
						value={moonForm.date}
						onChange={moonInput}
					/>
					<button type="submit">Get Moon Phase</button>
				</form>

			</section> */}
			<h3>Moon phase results:</h3>
			<img src={moonSRC} alt="Phase of the moon for a selected date" />
			<h3>Weather card:</h3>
			{/* <WeatherCard weatherData={weatherData} weatherForm={weatherForm} moonSRC={moonSRC} /> */}
		</div>
	);
}

export default WeatherPage;
