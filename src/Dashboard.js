import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Weather from "./Weather";
import ReactAnimatedWeather from "react-animated-weather";

export default function Dashboard(props) {
  return (
    <div className="row main-dashboard m-5">
      <div className="col-6 col-md information-box row flex-column">
        <div className="col row information flex-column">
          <div className="day">Tuesday</div>
          <div className="date">20 Jun 2023</div>
          <div className="current-city">Biarritz, FR</div>
        </div>
        <div className="col row information flex-column">
          <div className="mt-auto">
            <div className="icon">
              <ReactAnimatedWeather
                icon="CLEAR_DAY"
                color="white"
                size={80}
                animate={true}
              />
            </div>
            <div className="temp">29 °C</div>
            <div className="description">Sunny</div>
          </div>
        </div>
      </div>
      <div className="col-6 col-md p-0">
        <div className=" weather-box">
          <div className="row flex-column">
            <div className="weather-condition-box">
              <div className="weather-condition">
                PRECIPITATION
                <span className="float-end">{props.humidity}%</span>
              </div>
              <div className="weather-condition">
                HUMIDITY
                <span className="float-end">{props.humidity}% </span>
              </div>
              <div className="weather-condition">
                WIND
                <span className="float-end">{props.wind} km/h </span>
              </div>
            </div>
            <div className="row forecast-box flex-row px-0 mx-0">
              <div className="forecast col my-3 py-3 text-center">
                <ReactAnimatedWeather
                  icon="CLEAR_NIGHT"
                  color="black"
                  size={30}
                  animate={true}
                />
                <div>Tue</div>
                <div className="forecast-temp">29 °C</div>
              </div>
              <div className="forecast next-days  col my-3 py-3 text-center">
                <ReactAnimatedWeather
                  icon="PARTLY_CLOUDY_NIGHT"
                  color="white"
                  size={30}
                  animate={true}
                />
                <div>Tue</div>
                <div className="forecast-temp">29 °C</div>
              </div>
              <div className="forecast next-days  col my-3 py-3 text-center">
                <ReactAnimatedWeather
                  icon="SNOW"
                  color="white"
                  size={30}
                  animate={true}
                />
                <div>Tue</div>
                <div className="forecast-temp">29 °C</div>
              </div>
              <div className="forecast next-days col my-3 py-3 text-center">
                <ReactAnimatedWeather
                  icon="FOG"
                  color="white"
                  size={30}
                  animate={true}
                />
                <div>Tue</div>
                <div className="forecast-temp">29 °C</div>
              </div>
            </div>
            <Weather />
          </div>
        </div>
      </div>
    </div>
  );
}
