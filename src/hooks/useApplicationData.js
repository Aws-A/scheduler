import { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";


export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  const setDay = day => {
    return setState({ ...state, day })
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((response) => {
      //console.log(response);
      // set your states here with the correct values...
      setState(prev => ({
        ...prev, 
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data
      }));
    })
  }, []);

  //find the day
  function findDay(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return daysOfWeek[day]
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayOfWeek = findDay(state.day)
    let day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek]
    }
    console.log('Before Spots',day);
    if (!state.appointments[id].interview) {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots - 1
      }
    } else {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots
      }
    }

    let days = state.days
    days[dayOfWeek] = day;
    console.log('Spots',day);
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments
      });
    });
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayOfWeek = findDay(state.day)

    const day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots + 1
    }

    let days = state.days
    days[dayOfWeek] = day;


    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
      });
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
} 