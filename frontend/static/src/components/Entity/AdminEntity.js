import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthContextProvider";

// Getting current date
const today = new Date()
let cday = today.getDate().toString()
let cmonth = (today.getMonth() + 1).toString()
let cyear = today.getFullYear().toString()
// Padded 0's because format requirements
cday = String(cday).padStart(2, "0")
cmonth = String(cmonth).padStart(2, "0")
cyear = String(cyear).padStart(4, "0")
// Formatting full date
let date = `${cyear}-${cmonth}-${cday}`
// console.log("current date", date)


// Initial states, Pickens SC - 11pm from today's date
const INITIAL_PLANET = {
    lon: -84.39733,
    lat: 33.775867,
    from: date,
    to: '2023-03-09',
    time: "",
    hrs: "23",
    min: "00",
    sec: "00",
}
const INITIAL_MP = {
    lon: -84.39733,
    lat: 33.775867,
    date: date,
    view: "portrait-simple"
}
const INITIAL_WEATHER = {
    zip: "29671",
    date: date
}

function AdminEntity(props) {
    const [planetForm, setPlanetForm] = useState(INITIAL_PLANET)
    const [moonForm, setMoonForm] = useState(INITIAL_MP)
    const [moonSRC, setMoonSRC] = useState("")
    const [weatherForm, setWeatherForm] = useState(INITIAL_WEATHER);
    const [weatherData, setWeatherData] = useState({})

    const handleInput = (e) => {
        const { name, value } = e.target;
        setPlanetForm(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const formatTime = (time) => {
        const splitTime = time.split(":")
        setPlanetForm(prev => ({
            ...prev,
            hrs: splitTime[0],
            min: splitTime[1]
        }))
        // console.log("new planet form", planetForm)
        return `${planetForm.hrs}%3A${planetForm.min}%3A${planetForm.sec}`
    }

    const planetSubmit = async (e) => {
        e.preventDefault();

        let time = formatTime(planetForm.time)

        const getPlanets = async () => {
            const urlParams = `?longitude=${planetForm.lon}&latitude=${planetForm.lat}&elevation=1&from_date=${planetForm.from}&to_date=${planetForm.to}&time=${time}`;
            const staticParams =
                "?longitude=-84.39733&latitude=33.775867&elevation=1&from_date=2023-03-07&to_date=2023-03-07&time=10%3A56%3A57";

            console.log("url params", urlParams)
            const options = {
                method: "GET",
                headers: {
                    Authorization: JSON.stringify(process.env.REACT_APP_ASTRONOMY_API_KEY)
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
    }

    const mpSubmit = async (e) => {
        e.preventDefault()

        const options = {
            method: "POST",
            headers: {
                Authorization: JSON.stringify(process.env.REACT_APP_ASTRONOMY_API_KEY)
            },
            body: JSON.stringify({
                "format": "png",
                "style": {
                    "moonStyle": "default",
                    "backgroundStyle": "stars",
                    "backgroundColor": "black",
                    "headingColor": "white",
                    "textColor": "white"
                },
                "observer": {
                    "latitude": moonForm.lat,
                    "longitude": moonForm.lon,
                    "date": moonForm.date,
                },
                "view": {
                    "type": "landscape-simple",

                }
            })
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
        setMoonSRC(await data.data.imageUrl)
        // console.log(moonSRC)
    }

    const weatherSubmit = async (e) => {
        const WEATHER_BASE_URL = "http://api.weatherapi.com/v1";
		const WEATHER_PARAMS =
		`/current.json?key=7ce75041c90d4e24ade170422230503&q=${zip}&aqi=no`;

        const weatherUrl = WEATHER_BASE_URL + WEATHER_PARAMS;
        console.log("total weather URL", weatherUrl)

        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error("could not fetch atro forecast", response);
        }
        const data = await response.json();
        console.log("weather data", data);

        setWeatherData({
            type: data.current.condition.text,
            cloud: data.current.cloud,
            feelsLike_f: data.current.feelslike_f,
            temp_f: data.current.temp_f,
        })
        console.log("new weather object", weather)
    }


    return (
        <div id="admin-entity-view">
            <h1>I am the admin view for Entities</h1>
            <section id="planets-section">
                <h2>Planets:</h2>
                <form onSubmit={planetSubmit}>
                    <label htmlFor="lon">Longitutde</label>
                    <input type="text" name="lon" value={planetForm.lon} onChange={handleInput} />

                    <label htmlFor="lat">Latitude</label>
                    <input type="text" name="lat" value={planetForm.lat} onChange={handleInput} />

                    <label htmlFor="from">From date</label>
                    <input type="date" name="from" value={planetForm.from} onChange={handleInput} />

                    <label htmlFor="to">To date:</label>
                    <input type="date" name="to" value={planetForm.to} onChange={handleInput} />

                    <label htmlFor="time">Time</label>
                    <input type="time" name="time" value={planetForm.time} onChange={handleInput} />
                    {/* <input type="text" name="hrs" placeholder="hours" value={planetForm.hrs} onChange={handleInput} />
                    <input type="text" name="min" placeholder="minutes" value={planetForm.min} onChange={handleInput} />
                    <input type="text" name="sec" placeholder="seconds" value={planetForm.sec} onChange={handleInput} /> */}
                    <button type="submit">Get planets</button>
                </form>
            </section>
            <section>
                <h2>Moon phase:</h2>
                <form onSubmit={mpSubmit}>
                    <label htmlFor="lon">Longitutde</label>
                    <input type="text" name="lon" value={moonForm.lon} onChange={handleInput} />

                    <label htmlFor="lat">Latitude</label>
                    <input type="text" name="lat" value={moonForm.lat} onChange={handleInput} />

                    <label htmlFor="from">From date</label>
                    <input type="date" name="from" value={moonForm.date} onChange={handleInput} />
                    <button type="submit" >Get Moon Phase</button>
                </form>
                <h3>Moon phase results:</h3>
                <img src={moonSRC} alt="Phase of the moon for a selected date" />
            </section>
            <section>
                <h2>Weather:</h2>
                <form action="">
                    <label htmlFor="zip">Zip code:</label>
                    <input type="number" min="0" max="99999" value={weatherForm.zip} onChange={handleInput} />
                </form>
            </section>
        </div>
    )
}

export default AdminEntity

                // <form onSubmit={(e) => e.preventDefault()}>
                //     <h3>Unit testing</h3>
                //     <input type="time" name="time" value={planetForm.time} onChange={handleInput} />
                //     {/* <input type="time" name="min" placeholder="minutes" value={planetForm.min} onChange={handleInput} />
                //     <input type="time" name="sec" placeholder="seconds" value={planetForm.sec} onChange={handleInput} /> */}
                //     <button onClick={() => formatTime(planetForm.time)}>Test unit formatting</button>
                // </form>