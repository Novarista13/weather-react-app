import React, { useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import "./App.css";
// import { ColorRing } from "react-loader-spinner";
import "bootstrap/dist/css/bootstrap.css";

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
        className="form-control"
        placeholder="type a city"
        value={city}
        onChange={showCity}
      />
      <input type="submit" value="Change Location" className="btn search-btn" />
    </form>
  );

  if (reload) {
    return (
      <div>
        <Dashboard
          city={response.city}
          temp={response.city}
          description={response.description}
          humidity={response.humidity}
          wind={response.wind}
        />
        {form}
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
    return (
      <div>
        <Dashboard
          city="Yangon"
          temp={0}
          description="sunny"
          humidity={0}
          wind={0}
        />
        {form}
        {/* <ColorRing
          visible={true}
          height="30"
          width="30"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#5d8cc7", "#5d8cc7", "#5d8cc7", "#5d8cc7", "#5d8cc7"]}
        /> */}
      </div>
    );
  }
}
