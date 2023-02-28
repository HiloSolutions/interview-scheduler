import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

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
  }, []);

  const setDay = day => setState({ ...state, day });
  
  const bookInterview = (apptID, interview) => {
    const appointment = {
      ...state.appointments[apptID],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [apptID]: appointment
    };
    return axios.put(`/api/appointments/${apptID}`, {
      interview
    })
      .then(res => {
        setState({
          ...state,
          appointments
        });
        return { status: 204 };
      });
  };

  const deleteInterview = (apptID) => {
    return axios.delete(`/api/appointments/${apptID}`, {})
      .then(res => ({ status: 204 }));
  };

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }
}