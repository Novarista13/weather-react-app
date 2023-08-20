import React from "react";
import WeatherIcon from "./WeatherIcon";
import WeatherTemp from "./WeatherTemp";

export default function WeatherDescription(props) {
  return (
    <div className="mt-auto row description-row flex-md-row">
      <div className="icon col-md-6 col-sm-6 col-lg-12">
        <WeatherIcon icon={props.response.icon} size={80} color="white" />
      </div>
      <div className="temp my-auto col-md-6 col-sm-6 col-lg-12">
        <WeatherTemp
          temp={props.response.temp ? props.response.temp : 0}
          unit={props.unit}
        />
      </div>
      <div className="description col">
        {props.response.description ? props.response.description : "clear sky"}
      </div>
    </div>
  );
}
