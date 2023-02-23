import React, { useState, useEffect } from "react";

import axios from "axios";
import Appointment from "./Appointment";
import DayList from "components/DayList";
import "components/Application.scss";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  //const setDay = day => setState({ ...state, day });
  const dailyAppointments = [];
  


  //get the days
  useEffect(() => {
    axios.get('/api/days').then(response => {
      const days = response.data;
      //setState(prev => ({ ...prev, days }));
    });
  }, [state]);

  console.log('test', state.day, state.days);

  //call helper func for interview api
  // useEffect(() => {
  //   axios.get('/api/appointments').then(response => {
  //     const appts = getAppointmentsForDay(state,day);
  //     console.log("apps",appts);
  //   });
  // }, [day]);
  


  const appList =
    Object.values(state.appointments).map((i) => {
      return (
        <Appointment
          key={i.id}
          {...i}
        />
      )
    })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}//
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appList}
      </section>
    </main>
  );
}


