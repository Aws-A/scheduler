export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find((d) => d.name === day);

  if (!selectedDay) {
    return [];
  }
  const appointments = selectedDay.appointments.map((appointmentId) => state.appointments[appointmentId]);
  return appointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerInfo = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerInfo
  }
}

export function getInterviewersForDay(state, day) {
  const chosenDay = state.days.find((e) => e.name === day);

  if (!chosenDay) {
    return [];
  }
  const interviewersFromDays = chosenDay.interviewers.map((interviewId) => state.interviewers[interviewId]);
  return interviewersFromDays;
}