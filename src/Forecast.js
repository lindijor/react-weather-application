import React from "react";
import "./Forecast.css";

export default function Forecast() {
  return (
    <div className="forecastContainer">
      <div>
        <p>Thursday</p>
        <img src="https://openweathermap.org/img/wn/04n@2x.png" />
        <p>
          <span className="tempMax">16°</span> |{" "}
          <span className="tempMin"> 18°</span>
        </p>
      </div>
    </div>
  );
}
