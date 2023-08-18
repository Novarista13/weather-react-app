import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import WeatherIcon from "./WeatherIcon";

import "./App.css";
import DateFormatt from "./DateFormatt";
import WeatherTemp from "./WeatherTemp";
import WeekDay from "./WeekDay";

export default function Weather() {
  let [city, setCity] = useState("");
  let [response, setResponse] = useState([{}, {}, {}, {}, {}]);
  let [date, setDate] = useState(new Date());
  let [unit, setUnit] = useState("celsius");
  let [unitBtn, setUnitBtn] = useState("°F");

  function handleResponse(response) {
    setDate(new Date(response.data.list[0].dt * 1000));
    setResponse([
      {
        city: response.data.city.name,
        country: response.data.city.country,
        temp: response.data.list[0].temp.day,
        wind: response.data.list[0].speed,
        precipitation: Math.round(response.data.list[0].pop * 100),
        humidity: response.data.list[0].humidity,
        description: response.data.list[0].weather[0].description,
        icon: response.data.list[0].weather[0].icon,
        // src: `http://openweathermap.org/img/wn/${}@2x.png`,
      },
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

  function submitHandler(event) {
    event.preventDefault();
    let appId = "bd5e378503939ddaee76f12ad7a97608";
    let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=5&appid=${appId}&units=metric`;
    axios.get(url).then(handleResponse);
    setCity("");
  }

  function showCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div>
      <form onSubmit={submitHandler}>
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
          className="btn search-btn d-inline"
        />
        <a href="/" onClick={unitHandler} className="btn unit-btn ms-3">
          {unitBtn}
        </a>
      </form>
    </div>
  );
  let Dashboard = (
    <div className="row main-dashboard m-5">
      <div className="col-6 col-md information-box row flex-column">
        <div className="col row information flex-column">
          <DateFormatt date={date} />
          <div className="current-city pt-1">
            {response[0].city}, {response[0].country}
          </div>
        </div>
        <div className="col row information flex-column">
          <div className="mt-auto">
            <div className="icon">
              <WeatherIcon icon={response[0].icon} size={80} color="white" />
            </div>
            <div className="temp">
              <WeatherTemp
                temp={response[0].temp ? response[0].temp : 0}
                unit={unit}
              />
            </div>
            <div className="description">{response[0].description}</div>
          </div>
        </div>
      </div>
      <div className="col-6 col-md p-0">
        <div className=" weather-box">
          <div className="row flex-column">
            <div className="weather-condition-box">
              <div className="weather-condition">
                PRECIPITATION
                <span className="float-end">{response[0].precipitation}%</span>
              </div>
              <div className="weather-condition">
                HUMIDITY
                <span className="float-end">{response[0].humidity}% </span>
              </div>
              <div className="weather-condition">
                WIND
                <span className="float-end">{response[0].wind} km/h </span>
              </div>
            </div>

            <div className="row forecast-box flex-row px-0 mx-0">
              <div className="forecast col my-3 py-3 text-center">
                <WeatherIcon icon={response[1].icon} size={30} color="black" />
                <WeekDay date={date} next={1} />
                <div className="forecast-temp">
                  <WeatherTemp
                    temp={response[1].temp ? response[1].temp : 0}
                    unit={unit}
                  />
                </div>
              </div>
              <div className="forecast next-days  col my-3 py-3 text-center">
                <WeatherIcon icon={response[2].icon} size={30} color="white" />
                <WeekDay date={date} next={2} />
                <div className="forecast-temp">
                  <WeatherTemp
                    temp={response[2].temp ? response[2].temp : 0}
                    unit={unit}
                  />
                </div>
              </div>
              <div className="forecast next-days  col my-3 py-3 text-center">
                <WeatherIcon icon={response[3].icon} size={30} color="white" />
                <WeekDay date={date} next={3} />
                <div className="forecast-temp">
                  <WeatherTemp
                    temp={response[3].temp ? response[3].temp : 0}
                    unit={unit}
                  />
                </div>
              </div>
              <div className="forecast next-days col my-3 py-3 text-center">
                <WeatherIcon icon={response[4].icon} size={30} color="white" />
                <WeekDay date={date} next={4} />
                <div className="forecast-temp">
                  <WeatherTemp
                    temp={response[4].temp ? response[4].temp : 0}
                    unit={unit}
                  />
                </div>
              </div>
            </div>
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

  // if (reload) {
  //   return (
  //     <div>
  //       {Dashboard}
  //       {/* <a
  //         href="https://github.com/Novarista13/weather-react-app"
  //         target="_blank"
  //         rel="noreferrer"
  //         className="text-decoration-none d-block fs-5"
  //       >
  //         Open-Sourced
  //       </a> */}
  //     </div>
  //   );
  // } else {
  //   return <div>{Dashboard}</div>;
  // }
}
