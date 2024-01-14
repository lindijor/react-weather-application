import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import CurrentDate from "./CurrentDate";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("Oslo");
  const [inputValue, setInputValue] = useState("Oslo");

  function updateWeatherDetails(response) {
    console.log(response);
    setWeather({
      city: response.data.name,
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
    const apiKey = "aa76e8ebb986fd56a8de4b09138a4e55";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeatherDetails);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setCity(inputValue);
    search();
  }

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  if (loaded) {
    return (
      <div className="weatherAppBody">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Type a city..."
            className="searchBar"
            onChange={handleChange}
          ></input>
          <input
            type="submit"
            value="Search"
            className="searchBarButton"
          ></input>
        </form>
        <h1>{city}</h1>
        <div className="weatherContainer">
          <div className="currentTemperature">
            <img
              src={weather.weatherIcon}
              alt="weather-icon"
              width={66}
              height={66}
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
            <li className="currentWeather">{weather.description}</li>
          </ul>
        </div>
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
