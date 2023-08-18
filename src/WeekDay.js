import React, { useState } from "react";

export default function WeekDay(props) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let nextDay = props.date.getDay() + props.next;

  if (nextDay > 6) {
    nextDay = nextDay - 7;
  }

  let day = days[nextDay];

  return <div>{day}</div>;
}
