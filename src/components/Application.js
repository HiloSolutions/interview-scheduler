import React from "react";
import useApplicationData from "../hooks/useApplicationData";
import Appointment from "./Appointment";
import DayList from "components/DayList";
import "components/Application.scss";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview
} from "helpers/selectors";




export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();
  const { day, days } = state;

  const interviewers = getInterviewersForDay(state, day);
  const appointments = getAppointmentsForDay(state, day);
  const schedule =
    Object.values(appointments).map((i) => {
      const interview = getInterview(state, i.interview);
      return (
        <Appointment
          key={i.id}
          id={i.id}
          time={i.time}
          interview={interview}
          interviewers={interviewers}
          deleteInterview={deleteInterview}
          bookInterview={bookInterview}
        />
      );
    });

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
            days={days}
            value={day}
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
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}


