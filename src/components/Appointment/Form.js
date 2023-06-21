import React, { useState } from 'react';
import Button from "../Button";
import InterviewerList from "../InterviewerList";
import "components/Appointment/styles.scss";

export default function Form(props) {
  const [student, setStudent] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError]  = useState("");
  const reset = () => {
    setStudent('');
    setInterviewer(null);
  };
  const cancel = () => {
    reset();
    props.onCancel();
  };

  function validate() {
    if (student === "") {
      setError("student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("please select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
}

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name={props.student}
          type="text"
          placeholder="Enter Student Name"
          value={student}
          onChange={(event) => {setStudent(event.target.value)}}
          data-testid="student-name-input"
        />
        <section className="appointment__validation">{error}</section>
      </form>
      <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={validate}>Save</Button>
      </section>
    </section>
  </main>
  ); 
}