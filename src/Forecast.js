import React from "react";
import "./Forecast.css";
import axios from "axios";

export default function Forecast() {
  function getForecast(response) {
    console.log(response.data);
  }

  let apiKey = "aa76e8ebb986fd56a8de4b09138a4e55";
  let lat = "60";
  let lon = "11";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  axios.get(apiUrl).then(getForecast);

  return (
    <div className="forecastContainer">
      <div>
        <p>Thursday</p>
        <img
          src="https://openweathermap.org/img/wn/04n@2x.png"
          alt="weather-icon"
        />
        <p>
          <span className="tempMax">16°</span> |{" "}
          <span className="tempMin"> 18°</span>
        </p>
      </div>
    </div>
  );
}
