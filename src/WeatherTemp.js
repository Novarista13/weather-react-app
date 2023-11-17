import React from "react";

export default function WeatherTemp(props) {
  if (props.unit === "celsius") {
    return <span className="celsius">{Math.round(props.temp)} °C</span>;
  } else {
    return (
      <span className="fahrenheit">
        {Math.round((props.temp * 9) / 5 + 32)} °F
      </span>
    );
  }
}
