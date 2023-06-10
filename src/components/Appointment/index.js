import React from "react";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import "./styles.scss";

export default function Appointment(props) {

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview? <Show/>: <Empty/>}
    </article>
  ); 
}