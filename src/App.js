import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState("");

  function updateWeatherDetails(response) {
    setWeather(response.data.main.temp);
    setLoaded(true);
  }

  if (loaded) {
    return (
      <div className="weatherAppBody">
        <form>
          <input
            type="search"
            placeholder="Type a city..."
            className="searchBar"
          ></input>
          <input
            type="submit"
            value="Search"
            className="searchBarButton"
          ></input>
        </form>
        <h1>Oslo</h1>
        <div className="weatherContainer">
          <div className="currentTemperature">
            <img
              src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
              alt="weather-icon"
              width={64}
              height={64}
            />
            <p className="degrees">{Math.round(weather)}</p>
            <p className="celsius">°C</p>
          </div>

          <ul className="weatherDescription">
            <li>Nedbør: 0%</li>
            <li>Luftfuktighet: 76%</li>
            <li>Vind: 1 m/s</li>
          </ul>

          <ul className="dateDescription">
            <h2>Været</h2>
            <li>lørdag kl 21:00</li>
            <li>For det meste skyet</li>
          </ul>
        </div>
      </div>
    );
  } else {
    const apiKey = "aa76e8ebb986fd56a8de4b09138a4e55";
    let city = "London";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeatherDetails);

    return "Loading...";
  }
}
