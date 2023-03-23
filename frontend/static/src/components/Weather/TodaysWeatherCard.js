import "./weather.css";

function TodaysWeatherCard(props) {
	console.log({ props });
	console.log(props.weatherData.data.current.last_updated);
	return (
		<article className="weather-card">
			<h3>Weather for {props.weatherData.data.current.last_updated}</h3>
			<ul className="weather-card-ul">
				{/* <li>{props.weatherData.data.current.condition.icon}</li> */}
				<li>
					Weather: {props.weatherData.data.current.condition.text}
					<img
						className="weather-icon"
						src={props.weatherData.data.current.condition.icon}
					/>
				</li>
				<li>Cloud Coverage: {props.weatherData.data.current.cloud}%</li>
				<li>Feels Like: {props.weatherData.data.current.feelslike_f}</li>
				<li>Temperatue (F): {props.weatherData.data.current.temp_f}</li>
			</ul>
			<img
				src={props.weatherData.moonSRC}
				alt="Phase of the moon for a selected date"
			/>
		</article>
	);
}

export default TodaysWeatherCard;
