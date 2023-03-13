import "./weather.css";

function WeeklyWeatherCard(props) {
	return (
		<article className="weather-card">
			<h3>Weather for {props.date}</h3>
			<ul>
				<li>Weather: {props.type}</li>
				{/* <li>Cloud Coverage: {props.cloud}%</li> */}
				<li>Average Temperatue (F): {props.avgtemp_f}</li>
			</ul>
			<img src={props.moonSRC} alt="Phase of the moon for a selected date" />
		</article>
	);
}

export default WeeklyWeatherCard;
