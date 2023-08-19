import React from "react";

export default function WeatherCondition(props) {
  return (
    <div className="weather-condition-box">
      <div className="weather-condition">
        PRECIPITATION
        <span className="float-end">
          {props.response.precipitation ? props.response.precipitation : 0}%
        </span>
      </div>
      <div className="weather-condition">
        HUMIDITY
        <span className="float-end">
          {props.response.humidity ? props.response.humidity : 0}%{" "}
        </span>
      </div>
      <div className="weather-condition">
        WIND
        <span className="float-end">{props.response.wind} km/h </span>
      </div>
    </div>
  );
}
