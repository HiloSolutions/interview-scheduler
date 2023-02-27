import React, { useState, useEffect } from "react";
import axios from "axios";

import Appointment from "./Appointment";
import DayList from "components/DayList";
import "components/Application.scss";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";




export default function Application(props) {
  //console.log(1, props.interview);
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });


  const setDay = day => setState({ ...state, day }); //come back to this as this shouldnt be here (last task thursday)

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  },[]);


  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  //Book interviiews (create appt)
  const bookInterview = (id, interview) => {
    console.log('book interview',id, interview);
  };


  const schedule =
    Object.values(dailyAppointments).map((i) => {
      const interview = getInterview(state, i.interview);
      console.log('i',i);
      return (
        <Appointment
          key={i.id}
          id={i.id}
          time={i.time}
          interview={interview}
          bookInterview={bookInterview}
          interviewers={interviewers}
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
        {schedule}
      </section>
    </main>
  );
}


