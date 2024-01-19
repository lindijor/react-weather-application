import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import CurrentDate from "./CurrentDate";
import Temperature from "./Temperature";
import Forecast from "./Forecast";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("Oslo");

  function updateWeatherDetails(response) {
    setWeather({
      city: response.data.name,
      coordinates: response.data.coord,
      date: new Date(response.data.dt * 1000),
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      weatherIcon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
    setLoaded(true);
  }

  function search() {
    let apiKey = "aa76e8ebb986fd56a8de4b09138a4e55";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeatherDetails);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleChange(event) {
    setCity(event.target.value);
  }

  if (loaded) {
    return (
      <div>
        <div className="weatherAppBody">
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Search for a city..."
              className="searchBar"
              onChange={handleChange}
            ></input>
            <input
              type="submit"
              value="Search"
              className="searchBarButton"
            ></input>
          </form>
          <h1>{weather.city}</h1>
          <div className="weatherContainer">
            <div className="currentTemperature">
              <img
                src={weather.weatherIcon}
                alt="weather-icon"
                width={64}
                height={64}
              />
              <Temperature celsius={weather.temperature} />
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
              <li className="currentWeather">{weather.description}</li>
            </ul>
          </div>
          <Forecast coordinates={weather.coordinates} />
        </div>
        <p className="footer">
          This project was coded by Lindis Jørgensen and is{" "}
          <a href="https://github.com/lindijor/react-weather-application">
            open-sourced on GitHub
          </a>{" "}
          and hosted on Netlify.
        </p>
      </div>
    );
  } else {
    search("Oslo");
    return "Loading...";
  }
}
