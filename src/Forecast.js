import React, { useEffect, useState } from "react";
import "./Forecast.css";
import axios from "axios";
import ForecastDay from "./ForecastDay";

export default function Forecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState("");

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  function getForecast(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  if (loaded) {
    return (
      <div className="forecastContainer">
        {forecast.map(function (dailyForecast, index) {
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
    let lat = props.coordinates.lat;
    let lon = props.coordinates.lon;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(getForecast);

    return "Loading forecast...";
  }
}
