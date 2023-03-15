import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthContextProvider";
import StarList from "./StarList";
import "./admin.css";

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
// console.log("current date", date)

// Initial states, Pickens SC - 11pm from today's date
const INITIAL_PLANET = {
	lon: -84.39733,
	lat: 33.775867,
	from: date,
	to: "2023-03-09",
	time: "",
	hrs: "23",
	min: "00",
	sec: "00",
};
const INITIAL_MP = {
	lon: -84.39733,
	lat: 33.775867,
	date: date,
	view: "portrait-simple",
};
const INITIAL_WEATHER = {
	zip: "29671",
	date: date,
};
const INITIAL_CONSTELLATION = {
	entityName: "Draco",
	isStar: false,
};
const INITIAL_STARS = [
	{
		name: "star name",
		constellation: "the constellation",
		right_ascension: 420,
		declination: 69,
	},
];

function AdminEntity(props) {
	const [planetForm, setPlanetForm] = useState(INITIAL_PLANET);
	const [entityForm, setEnetityForm] = useState(INITIAL_CONSTELLATION);
	const [stars, setStars] = useState(INITIAL_STARS);
	const [starType, setStarType] = useState("star");
	// const [starOrConst, setStarOrConst]
	const [moonForm, setMoonForm] = useState(INITIAL_MP);
	const [moonSRC, setMoonSRC] = useState("");
	const [weatherForm, setWeatherForm] = useState(INITIAL_WEATHER);
	const [weatherData, setWeatherData] = useState({});

	const { isAuth, user } = useContext(AuthContext);

	const planetInput = (e) => {
		const { name, value } = e.target;
		setPlanetForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};
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
	const entityInput = (e) => {
		const { name, value } = e.target;
		setEnetityForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const formatTime = (time) => {
		const splitTime = time.split(":");
		setPlanetForm((prev) => ({
			...prev,
			hrs: splitTime[0],
			min: splitTime[1],
		}));
		// console.log("new planet form", planetForm)
		return `${planetForm.hrs}%3A${planetForm.min}%3A${planetForm.sec}`;
	};

	const planetSubmit = async (e) => {
		e.preventDefault();

		let time = formatTime(planetForm.time);

		const getPlanets = async () => {
			const urlParams = `?longitude=${planetForm.lon}&latitude=${planetForm.lat}&elevation=1&from_date=${planetForm.from}&to_date=${planetForm.to}&time=${time}`;
			const staticParams =
				"?longitude=-84.39733&latitude=33.775867&elevation=1&from_date=2023-03-07&to_date=2023-03-07&time=10%3A56%3A57";

			console.log("url params", urlParams);
			const options = {
				method: "GET",
				headers: {
					Authorization: JSON.stringify(
						process.env.REACT_APP_ASTRONOMY_API_KEY
					),
				},
			};
			const response = await fetch(
				`https://api.astronomyapi.com/api/v2/bodies/positions${urlParams}`,
				options
			);
			if (!response.ok) {
				throw new Error("Could not retrieve astro info");
			}
			const data = await response.json();
			// console.log("astro data: ", data)
			const astroFiltered = data.data.table.rows[0].cells[0];
			const astroPos = astroFiltered.position;
			const HorAlt = astroPos.horizontal.altitude;
			// console.log("astro filtered:", astroFiltered)
			// console.log("position", astroPos)
			// console.log("altitude", HorAlt);
		};
		getPlanets();
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

	const weatherSubmit = async (e) => {
		e.preventDefault();
		const KEY = process.env.REACT_APP_WEATHER_API_KEY;
		const WEATHER_BASE_URL = "http://api.weatherapi.com/v1";
		const WEATHER_PARAMS = `/current.json?key=${KEY}&q=${weatherForm.zip}&aqi=no`;

		const weatherUrl = WEATHER_BASE_URL + WEATHER_PARAMS;
		console.log("total weather URL", weatherUrl);

		const response = await fetch(weatherUrl);
		if (!response.ok) {
			throw new Error("could not fetch weather forecast", response);
		}
		const data = await response.json();
		console.log("weather data", data);

		setWeatherData({
			type: data.current.condition.text,
			cloud: data.current.cloud,
			feelsLike_f: data.current.feelslike_f,
			temp_f: data.current.temp_f,
		});
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

	const entitySubmit = async (e) => {
		e.preventDefault();
		const name = e.target[0].value;
		const isStar = e.target[1].checked;

		let type = "";
		let urlParams = "";

		if (isStar) {
			urlParams = `name=${name}`;
			type = "star";
		} else {
			urlParams = `constellation=${name}`;
			type = "const";
		}

		const options = {
			method: "GET",
			headers: {
				"X-Api-Key": process.env.REACT_APP_NINJA_API_KEY,
			},
		};
		const response = await fetch(
			`https://api.api-ninjas.com/v1/stars?${urlParams}`,
			options
		);
		if (!response.ok) {
			throw new Error("Could not retrieve astro info");
		}
		const data = await response.json();
		console.log("ninja data: ", data);
		setStars(data);
		setStarType(type);
	};

	return (
		<>
			{user.is_superuser ? (
				<div id="admin-entity-view">
					<h1>I am the admin view for Entities</h1>
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
							<button type="submit">Get weather</button>
						</form>
					</section>

					<section id="admin-moon-form">
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
						<h3>Moon phase results:</h3>
						<img src={moonSRC} alt="Phase of the moon for a selected date" />
					</section>

					<section id="admin-planets-form">
						<h2>Planets:</h2>
						<form onSubmit={planetSubmit}>
							<label htmlFor="lon">Longitutde</label>
							<input
								type="text"
								name="lon"
								value={planetForm.lon}
								onChange={planetInput}
							/>

							<label htmlFor="lat">Latitude</label>
							<input
								type="text"
								name="lat"
								value={planetForm.lat}
								onChange={planetInput}
							/>

							<label htmlFor="from">From date</label>
							<input
								type="date"
								name="from"
								value={planetForm.from}
								onChange={planetInput}
							/>

							<label htmlFor="to">To date:</label>
							<input
								type="date"
								name="to"
								value={planetForm.to}
								onChange={planetInput}
							/>

							<label htmlFor="time">Time</label>
							<input
								type="time"
								name="time"
								value={planetForm.time}
								onChange={planetInput}
							/>
							<button type="submit">Get planets</button>
						</form>
					</section>

					<section id="admin-constellation-form">
						<h2>Stars:</h2>
						<form onSubmit={entitySubmit}>
							<label htmlFor="entity-name">Name</label>
							<input
								type="text"
								name="entityName"
								value={entityForm.entityName}
								onChange={entityInput}
							/>

							<label htmlFor="isStar">
								Is this is Star? (no = constellation)
							</label>
							<input type="checkbox" name="isStar" />

							<button type="submit">Get stars</button>
						</form>
					</section>
					<StarList stars={stars} starType={starType} />
				</div>
			) : (
				<h2>You shouln't be here...</h2>
			)}
		</>
	);
}

export default AdminEntity;

// <form onSubmit={(e) => e.preventDefault()}>
//     <h3>Unit testing</h3>
//     <input type="time" name="time" value={planetForm.time} onChange={handleInput} />
//     {/* <input type="time" name="min" placeholder="minutes" value={planetForm.min} onChange={handleInput} />
//     <input type="time" name="sec" placeholder="seconds" value={planetForm.sec} onChange={handleInput} /> */}
//     <button onClick={() => formatTime(planetForm.time)}>Test unit formatting</button>
// </form>
