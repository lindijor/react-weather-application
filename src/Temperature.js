import React, { useState } from "react";

export default function Temperature(props) {
  const [units, setUnits] = useState("celsius");

  function changeToFahrenheit(event) {
    event.preventDefault();
    setUnits("fahrenheit");
  }

  function changeToCelsius(event) {
    event.preventDefault();
    setUnits("celsius");
  }

  if (units === "celsius") {
    return (
      <div>
        <span className="degrees">{Math.round(props.celsius)}</span>
        <span className="units">
          °C |{" "}
          <a href="/" onClick={changeToFahrenheit}>
            °F
          </a>
        </span>
      </div>
    );
  } else {
    let fahrenheit = (props.celsius * 9) / 5 + 32;
    return (
      <span>
        <span className="degrees">{Math.round(fahrenheit)}</span>
        <span className="units">
          <a href="/" onClick={changeToCelsius}>
            °C
          </a>{" "}
          | °F
        </span>
      </span>
    );
  }
}
