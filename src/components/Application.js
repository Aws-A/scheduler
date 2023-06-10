import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "components/DayList.js";

/*const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};*/


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  const setDays = (days) => setState({ ...state, days })

   //Add the line below:
  const dailyAppointments = [];


useEffect(() => {
  Promise.all([
    axios.get("http://localhost:8001/api/days")
  ]).then((response) => {
    // set your states here with the correct values...
    setDays(response[0].data)
  })
}, []);
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList 
    days={state.days}
    day={state.day}
    setDay={ (day) => setState({ ...state, day })}
/>
 
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => {
          let interview = appointment.interview;
          return (
            <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview && appointment.interview}
          />
        )
        } 
        )}
        <Appointment
        key={Appointment.id} 
        id={Appointment.id} 
        time={Appointment.time} 
        interview={Appointment.interview} 
        />
      </section>

    </main>
  );
}
