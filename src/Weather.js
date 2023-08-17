import React, { useState } from "react";
import axios from "axios";
import "./App.css";
// import { ColorRing } from "react-loader-spinner";
import "bootstrap/dist/css/bootstrap.css";
import ReactAnimatedWeather from "react-animated-weather";

export default function Weather() {
  let [city, setCity] = useState("");
  let [response, setResponse] = useState({});
  let [reload, setReload] = useState(false);

  function handleResponse(response) {
    setReload(true);
    setResponse({
      city: response.data.name,
      temp: Math.round(response.data.main.temp),
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      src: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    let appId = "cd173a006b0e51dac58c6d8064c94178";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}&units=metric`;
    axios.get(url).then(handleResponse);
    setCity("");
  }

  function showCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="type a city"
        value={city}
        onChange={showCity}
      />
      <input type="submit" value="Change Location" className="btn search-btn" />
    </form>
  );

  let Dashboard = (
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
                <span className="float-end">{response.humidity}%</span>
              </div>
              <div className="weather-condition">
                HUMIDITY
                <span className="float-end">{response.humidity}% </span>
              </div>
              <div className="weather-condition">
                WIND
                <span className="float-end">{response.wind} km/h </span>
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
            {form}
          </div>
        </div>
      </div>
    </div>
  );

  if (reload) {
    return (
      <div>
        {Dashboard}
        {/* <div>
          <img src={response.src} alt={response.description} />
        </div> */}
        {/* <a
          href="https://github.com/Novarista13/weather-react-app"
          target="_blank"
          rel="noreferrer"
          className="text-decoration-none d-block fs-5"
        >
          Open-Sourced
        </a> */}
      </div>
    );
  } else {
    return <div>{Dashboard}</div>;
  }
}
