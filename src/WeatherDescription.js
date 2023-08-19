import React from "react";
import WeatherIcon from "./WeatherIcon";
import WeatherTemp from "./WeatherTemp";

export default function WeatherDescription(props) {
  return (
    <div className="mt-auto">
      <div className="icon">
        <WeatherIcon icon={props.response.icon} size={80} color="white" />
      </div>
      <div className="temp">
        <WeatherTemp
          temp={props.response.temp ? props.response.temp : 0}
          unit={props.unit}
        />
      </div>
      <div className="description">{props.response.description}</div>
    </div>
  );
}
