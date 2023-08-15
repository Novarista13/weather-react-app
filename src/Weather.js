import React from "react";
import axios from "axios";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";

export default function Weather(props) {
  let [city, setCity] = useState("");
  let [temp, setTemp] = useState(null);
  function handleResponse(response) {
    // alert(`The temperature in ${props.city} is ${response.data.main.temp}`);
    setCity(props.city);
    setTemp(Math.round(response.data.main.temp));
  }

  let appId = "cd173a006b0e51dac58c6d8064c94178";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${appId}&units=metric`;
  axios.get(url).then(handleResponse);

  return (
    <div>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
      <h1>
        The temperature in {city} is {temp}°C.
      </h1>
    </div>
  );
}
