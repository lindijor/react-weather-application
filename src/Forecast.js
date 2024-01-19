import React, { useEffect, useState } from "react";
import "./Forecast.css";
import axios from "axios";
import ForecastDay from "./ForecastDay";

export default function Forecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  function getForecast(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  if (loaded) {
    const forecastStartingTomorrow = forecast.slice(1);

    return (
      <div className="forecastContainer">
        {forecastStartingTomorrow.map(function (dailyForecast, index) {
          return (
            <span key={index}>
              <ForecastDay data={dailyForecast} />
            </span>
          );
        })}
      </div>
    );
  } else {
    let apiKey = "025000aa1bof6148etc27f34c35bd48a";
    let lat = props.coordinates.latitude;
    let lon = props.coordinates.longitude;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(getForecast);

    return "Loading forecast...";
  }
}
