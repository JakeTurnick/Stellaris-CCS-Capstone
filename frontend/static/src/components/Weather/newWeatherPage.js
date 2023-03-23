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

function NewWeatherPage(props) {
	const { isAuth, user } = useContext(AuthContext);
	const [zip, setZip] = useState(INITIAL_ZIP);
	const [view, setView] = useState("today");
	// LATER (asky mady) -> user.defaultZip
	const [moonForm, setMoonForm] = useState(INITIAL_MP);
	// const [moonSRC, setMoonSRC] = useState("");
	const [weatherForm, setWeatherForm] = useState({
		zip: user.default_zip || 29601,
		date: date,
	});
	const [weatherData, setWeatherData] = useState();
	const [weatherToday, setWeatherToday] = useState({});
	const [weatherWeek, setWeatherWeek] = useState();
	const [weekCards, setWeekCards] = useState();
	const [weatherLookup, setWeatherLookup] = useState({});
	const [dummy, setDummy] = useState([]);

	// const moonInput = (e) => {
	// 	const { name, value } = e.target;
	// 	setMoonForm((prev) => ({
	// 		...prev,
	// 		[name]: value,
	// 	}));
	// };
	const weatherInput = (e) => {
		const { name, value } = e.target;
		setWeatherForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const getMoon = async (lat, lon, date) => {
		const payload = {
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
		};
		// console.log(payload.observer);
		const options = {
			method: "POST",
			headers: {
				Authorization: JSON.stringify(process.env.REACT_APP_ASTRONOMY_API_KEY),
			},
			body: JSON.stringify(payload),
		};
		const response = await fetch(
			"https://api.astronomyapi.com/api/v2/studio/moon-phase",
			options
		);

		if (!response.ok) {
			throw new Error("Could not retrieve astro info", response);
		}
		const data = await response.json();
		// console.log("moon data: ", data.data);
		// setMoonSRC(data.data.imageUrl);
		const testSRC = await data.data.imageUrl;
		return testSRC;
		// console.log(moonSRC)
	};

	const getCurrentWeather = async (e) => {
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

		const currDT = await data.location.localtime.split(" ");
		const currDate = await currDT[0];
		console.log(currDate);
		const lat = await data.location.lat;
		const lon = await data.location.lon;

		const moonSRC = await getMoon(lat, lon, currDate);
		console.log({ moonSRC });

		setWeatherData({ data, moonSRC });
		// setWeatherData({ moonSRC: moonSRC, weather: data });
	};

	useEffect(() => {
		console.log({ weatherData });
	}, [weatherData]);

	// let weekForecastHTML;

	const getWeeksWeather = async (e) => {
		if (e) {
			e.preventDefault();
		}

		const KEY = process.env.REACT_APP_WEATHER_API_KEY;
		const WEATHER_BASE_URL = "http://api.weatherapi.com/v1";
		const WEATHER_PARAMS = `/forecast.json?key=${KEY}&q=${weatherForm.zip}&days=14&aqi=no&alerts=no`;

		const weatherUrl = WEATHER_BASE_URL + WEATHER_PARAMS;
		// console.log("total weather URL", weatherUrl);

		const response = await fetch(weatherUrl);
		if (!response.ok) {
			throw new Error("could not fetch weather forecast", response);
		}
		const data = await response.json();
		console.log("weekly weather", await data);

		// Get Moon phase as well -
		const currDT = await data.location.localtime.split(" ");
		const currDate = currDT[0];
		// console.log(currDT);

		let testWeek = [];
		const moonWeek = await data.forecast.forecastday.map(async (day) => {
			const src = await getMoon(data.location.lat, data.location.lon, day.date);

			const testDay = await {
				...day,
				src,
			};
			// const updatedDay = { ...day };
			// updatedDay.src = await src;
			testWeek.push(testDay);
			// console.log({ testDay });
			return testDay;
		});

		// console.log({ moonWeek });
		console.log({ testWeek });
		setWeatherWeek(testWeek);
		// setDummy( testWeek);
	};

	// useEffect(() => {
	// 	console.log({ weatherWeek });
	// }, [weatherWeek]);

	const getWeek = () => {
		setView("week");
	};

	// Current weather - pull from default zip, default to today's date
	// Weather by date/location - change date/location a pull weather
	// Events on that day
	// This could be user plans/trackedEvents

	const weekForecastHTML = weatherWeek?.map((day) => (
		<WeeklyWeatherCard day={day} />
	));

	console.log({ weekForecastHTML });
	return (
		<div id="weather-page">
			<h1>View weather for:</h1>
			<ul id="weather-view-choice">
				<li>
					<button onClick={() => setView("today")} value="today">
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
			{view === "today" ? (
				<div className="weather-today">
					<h1>Today's view</h1>
					<form onSubmit={getCurrentWeather}>
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
					{weatherData ? (
						<TodaysWeatherCard weatherData={weatherData} />
					) : (
						<div></div>
					)}
				</div>
			) : view === "week" ? (
				<div className="weather-week">
					<h1>This week's weather</h1>
					<form onSubmit={getWeeksWeather}>
						<label htmlFor="zip">Zip code:</label>
						<input
							type="number"
							name="zip"
							min="0"
							max="99999"
							value={weatherForm.zip}
							onChange={weatherInput}
						/>
						<button type="submit">Get weather for this week</button>
					</form>
					<div className="weather-week-ul">{weekForecastHTML}</div>
				</div>
			) : view === "lookup" ? (
				<h1>Look up weather</h1>
			) : (
				<div></div>
			)}
		</div>
	);
}

export default NewWeatherPage;
