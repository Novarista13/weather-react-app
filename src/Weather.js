import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import DateFormatt from "./DateFormatt";
import WeatherDescription from "./WeatherDescription";
import WeatherCondition from "./WeatherCondition";
import WeatherForecast from "./WeatherForecast";

export default function Weather() {
  let [city, setCity] = useState("");
  let [response, setResponse] = useState({});
  let [forecast, setForecast] = useState([{}, {}, {}, {}]);
  let [date, setDate] = useState(new Date());
  let [unit, setUnit] = useState("celsius");
  let [unitBtn, setUnitBtn] = useState("°F");

  // Weather api

  function weatherApi() {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(handleResponse);
  }

  function handleResponse(response) {
    setDate(new Date(response.data.dt * 1000));

    setResponse({
      temp: response.data.main.temp,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      precipitation: Math.round(response.data.wind.gust),
      city: response.data.name,
      country: response.data.sys.country,
      // src: `http://openweathermap.org/img/wn/${}@2x.png`,
    });
  }

  // Forecast api

  function forecastApi() {
    let apiKey = "bd5e378503939ddaee76f12ad7a97608";
    let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=5&appid=${apiKey}&units=metric`;
    axios.get(url).then(handleForecastResponse);
  }

  function handleForecastResponse(response) {
    console.log(response);

    setForecast([
      {
        temp: Math.round(response.data.list[1].temp.day),
        icon: response.data.list[1].weather[0].icon,
      },
      {
        temp: Math.round(response.data.list[2].temp.day),
        icon: response.data.list[2].weather[0].icon,
      },
      {
        temp: Math.round(response.data.list[3].temp.day),
        icon: response.data.list[3].weather[0].icon,
      },
      {
        temp: Math.round(response.data.list[4].temp.day),
        icon: response.data.list[4].weather[0].icon,
      },
    ]);
  }

  // Form Handlers
  function submitHandler(event) {
    event.preventDefault();
    weatherApi();
    forecastApi();
    setCity("");
  }

  function unitHandler(event) {
    event.preventDefault();
    if (unit === "celsius") {
      setUnit("fahren");
      setUnitBtn("°C");
    } else {
      setUnit("celsius");
      setUnitBtn("°F");
    }
  }

  function showCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div>
      <form onSubmit={submitHandler} className="col-12">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="type a city"
          value={city}
          onChange={showCity}
        />
        <input
          type="submit"
          value="Change Location"
          className="btn search-btn d-inline "
        />
        <a href="/" onClick={unitHandler} className="btn unit-btn ms-3">
          {unitBtn}
        </a>
      </form>
    </div>
  );

  let forcastBox = (
    <div className="row forecast-box flex-row px-0 mx-0">
      <WeatherForecast
        forecast={forecast}
        unit={unit}
        date={date}
        x={0}
        next={1}
      />
      <WeatherForecast
        forecast={forecast}
        unit={unit}
        date={date}
        x={1}
        next={2}
      />
      <WeatherForecast
        forecast={forecast}
        unit={unit}
        date={date}
        x={2}
        next={3}
      />
      <WeatherForecast
        forecast={forecast}
        unit={unit}
        date={date}
        x={3}
        next={4}
      />
    </div>
  );

  let Dashboard = (
    <div className="row main-dashboard mx-auto my-5">
      <div className="col-lg-6 col-md-12 information-box row flex-row">
        <div className="col-lg-12 col-6 row information flex-column">
          <DateFormatt date={date} response={response} />
        </div>
        <div className="col-lg-12 description-box col-6 row information flex-row flex-lg-column ">
          <WeatherDescription response={response} unit={unit} />
        </div>
      </div>
      <div className="col-lg-6 col-12 p-0">
        <div className=" weather-box">
          <div className="row flex-row">
            <WeatherCondition response={response} />
            <div className="col-md-7 col-12 col-lg-12">{forcastBox}</div>
            {form}
          </div>
        </div>
      </div>

      <footer>
        UI Design credit goes to
        <a
          href="https://www.figma.com/community/file/1176173521127853129"
          target="_blank"
          rel="noreferrer"
          className="text-decoration-none"
        >
          {" "}
          Here
        </a>
      </footer>
    </div>
  );

  return <div>{Dashboard}</div>;
}
