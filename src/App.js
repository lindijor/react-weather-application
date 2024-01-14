import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import CurrentDate from "./CurrentDate";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState("");

  function updateWeatherDetails(response) {
    console.log(response);
    setWeather({
      date: new Date(response.data.dt * 1000),
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      weatherIcon:
        "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      description: response.data.weather[0].description,
    });
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
              src={weather.weatherIcon}
              alt="weather-icon"
              width={64}
              height={64}
            />
            <p className="degrees">{Math.round(weather.temperature)}</p>
            <p className="celsius">°C</p>
          </div>

          <ul className="weatherDescription">
            <li>Humidity: {weather.humidity}%</li>
            <li>Wind: {weather.wind} km/h</li>
          </ul>

          <ul className="dateDescription">
            <h2>Weather</h2>
            <li>
              <CurrentDate date={weather.date} />
            </li>
            <li>{weather.description}</li>
          </ul>
        </div>
      </div>
    );
  } else {
    const apiKey = "aa76e8ebb986fd56a8de4b09138a4e55";
    let city = "Paris";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeatherDetails);

    return "Loading...";
  }
}
