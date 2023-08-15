import React from "react";
import axios from "axios";
import { useState } from "react";
import "./App.css";
import { ColorRing } from "react-loader-spinner";

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
    <form className="input-group" onSubmit={submitHandler}>
      <input
        type="text"
        className="form-control"
        placeholder="type a city"
        value={city}
        onChange={showCity}
      />
      <input type="submit" value="search" className="btn btn-primary" />
    </form>
  );

  if (reload) {
    return (
      <div className="Weather">
        <h1>{form}</h1>
        <div>City: {response.city}</div>
        <div>Temp: {response.temp}°C</div>
        <div>Description: {response.description}</div>
        <div>Humidity: {response.humidity}%</div>
        <div>Wind: {response.wind} km/h</div>
        <div>
          <img src={response.src} alt={response.description} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="Weather">
        <h1>{form}</h1>
        <ColorRing
          visible={true}
          height="30"
          width="30"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }
}
