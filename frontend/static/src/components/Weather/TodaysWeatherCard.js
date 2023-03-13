import "./weather.css";

function TodaysWeatherCard(props) {
	return (
		<article className="weather-card">
			<h3>Weather for {props.date}</h3>
			<ul>
				<li>Weather: {props.type}</li>
				<li>Cloud Coverage: {props.cloud}%</li>
				<li>Feels Like: {props.feelsLike_f}</li>
				<li>Temperatue (F): {props.temp_f}</li>
			</ul>
			<img src={props.moonSRC} alt="Phase of the moon for a selected date" />
		</article>
	);
}

export default TodaysWeatherCard;
