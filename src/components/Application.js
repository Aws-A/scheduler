import React from "react";
import useApplicationData from "hooks/useApplicationData.js";
import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "components/DayList.js";
import { getAppointmentsForDay } from "../helpers/selectors.js";
import { getInterview } from "../helpers/selectors.js";
import { getInterviewersForDay } from "../helpers/selectors.js";


export default function Application(props) {
  const {state, setState, bookInterview, cancelInterview } = useApplicationData();



   //Add the line below:
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

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
          let interview = getInterview(state, appointment.interview)
          return (
            <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview}
            interviewers={dailyInterviewers}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
          />
          )
        } 
        )}
      </section>

    </main>
  );
}
