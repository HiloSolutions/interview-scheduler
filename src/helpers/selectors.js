export function getAppointmentsForDay(state, day) {
  const results = [];
  const dayObj = state.days.find(d => d.name === day)

  if(!dayObj) {
    return [];
  }

  for (const id of dayObj.appointments) {
    results.push(state.appointments[id]);
  }
  
  return results;
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


export function getInterviewersForDay(state, day) {
  const filteredArr = [];

  state.days.forEach((d) => {
    if (d.name === day) {
      d.interviewers.forEach(id => {
        filteredArr.push(state.interviewers[id])
      })
    }
  });

  return filteredArr;
};