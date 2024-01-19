import React from "react";
import "./Forecast.css";

export default function ForecastDay(props) {
  function maxTemp() {
    let temperature = Math.round(props.data.temperature.maximum);
    return `${temperature}°`;
  }

  function minTemp() {
    let temperature = Math.round(props.data.temperature.minimum);
    return `${temperature}°`;
  }

  function day() {
    let date = new Date(props.data.time * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  return (
    <div className="forecastContainer">
      <div>
        <p>{day()}</p>
        <img src={props.data.condition.icon_url} alt="weather-icon" />
        <p>
          <span className="tempMax">{maxTemp()}</span> |{" "}
          <span className="tempMin"> {minTemp()}</span>
        </p>
      </div>
    </div>
  );
}
