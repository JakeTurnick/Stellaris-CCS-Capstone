import "./weather.css";

function WeeklyWeatherCard(props) {
	// console.log("weekly weather card", { props });
	return (
		<article className="weather-card">
			<h3>Weather for {props.day.date}</h3>
			<ul>
				<li>
					Weather: {props.day.day.condition.text}{" "}
					<img className="weather-icon" src={props.day.day.condition.icon} />
				</li>
				{/* <li>Cloud Coverage: {props.cloud}%</li> */}
				<li>Average Temperatue (F): {props.day.day.avgtemp_f}</li>
			</ul>
			<img src={props.day.src} alt="Phase of the moon for a selected date" />
		</article>
	);
}

export default WeeklyWeatherCard;
