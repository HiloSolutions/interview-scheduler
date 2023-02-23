export function getAppointmentsForDay(state, day) {
  const filteredArr = [];

  state.days.forEach((d) => {
    if (d.name === day) {
      d.appointments.forEach(id => {
        filteredArr.push(state.appointments[id])
      })
    }
  });

  return filteredArr;
};


export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  const interviewData = {
    student:interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
  
  return interviewData;
};
