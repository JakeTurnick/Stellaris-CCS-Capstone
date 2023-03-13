import "./weather.css"

function WeatherCard(props) {

    return (
        <article className="weather-card">
            <h3>Weather for {props.weatherForm.date}</h3>
            <ul>
                <li>Weather: {props.weatherData.type}</li>
                <li>Cloud Coverage: {props.weatherData.cloud}</li>
                <li>Feels Like: {props.weatherData.feelsLike_f}</li>
                <li>Temperatue (F): {props.weatherData.temp_f}</li>
            </ul>
            <img src={props.moonSRC} alt="Phase of the moon for a selected date" />
        </article>
    )
}

export default WeatherCard