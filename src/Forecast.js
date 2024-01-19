import React, { useState } from "react";
import "./Forecast.css";
import axios from "axios";

export default function Forecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState("");

  function getForecast(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  if (loaded) {
    return (
      <div className="forecastContainer">
        <div>
          <p>{forecast[0].dt}</p>
          <img src={forecast[0].weather[0].icon} alt="weather-icon" />
          <p>
            <span className="tempMax">{Math.round(forecast[0].temp.max)}°</span>{" "}
            |{" "}
            <span className="tempMin">
              {" "}
              {Math.round(forecast[0].temp.min)}°
            </span>
          </p>
        </div>
      </div>
    );
  } else {
    let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
    let lat = props.coordinates.lat;
    let lon = props.coordinates.lon;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(getForecast);

    return "Loading forecast...";
  }
}
