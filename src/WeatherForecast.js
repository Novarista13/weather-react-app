import React from "react";
import WeekDay from "./WeekDay";
import WeatherIcon from "./WeatherIcon";
import WeatherTemp from "./WeatherTemp";

export default function WeatherForecast(props) {

    return (
      <div className="forecast col my-3 py-3 text-center">
        <WeatherIcon icon={props.forecast[props.x].icon} size={30} color="black" />
        <WeekDay date={props.date} next={props.next} />
        <div className="forecast-temp">
          <WeatherTemp
            temp={props.forecast[props.x].temp ? props.forecast[props.x].temp : 0}
            unit={props.unit}
          />
        </div>
      </div>
    );
    
}
