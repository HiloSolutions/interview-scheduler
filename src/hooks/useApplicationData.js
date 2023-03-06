import { useState, useEffect } from "react";
import axios from "axios";

const updateSpots = function(state, appointments) {
  const index = state.days.findIndex(d => d.name === state.day);
  let dayObj = state.days[index];
  let spots = 0;

  for (const id of dayObj.appointments) {
    const appointment = appointments[id];
    if (!appointment.interview) spots ++;
  }
  
  let updatedDays = [...state.days];
  updatedDays[index] = {...dayObj, spots};
  
  return updatedDays;
};


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
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => ({...prev, days, appointments, interviewers}));
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
        
        //const days = updateSpots(state, appointments);
        const updatedDays = updateSpots(state, appointments);
        setState({...state, appointments , days: updatedDays});
         //now stale use days
        return { status: 204 };
      })
  };

  const deleteInterview = (apptID) => {
    const appointment = {
      ...state.appointments[apptID],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [apptID]: appointment
    };
  
    return axios.delete(`/api/appointments/${apptID}`, {})
      .then(res => {
        const updatedDays = updateSpots(state, appointments);
        setState({...state, appointments, days: updatedDays});
        return { status: 204 }
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }
}