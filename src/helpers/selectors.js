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
}
