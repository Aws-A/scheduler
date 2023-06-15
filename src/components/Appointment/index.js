import React from "react";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import Form from "./Form.js";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode.js";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const DELETING = "DELETING";
  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);

    //in Application.js, we used return axios which will return a promise, so we need to use .then() here,  .then uses an anonymous callback function
    props.bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      .catch(error => transition(ERROR_SAVE));
  }

  //remove function
  function destroy() {
    transition(DELETING, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(() => transition(ERROR_DELETE, true));
   }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          //for editing the appointment
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          bookInterview={props.bookInterview}
          onSave={save}
        />
      )}

      {mode === SAVING && (
        <Status message="Saving" />
      )}

      {mode === CONFIRM && (
        <Confirm
          onConfirm={destroy}
          onCancel={back}
          message="Are you sure you would like to delete?"
        />
      )}
      {mode === EDIT && (
        <Form
        name={props.name ? props.name : props.interview.student}
        interviewer={props.interview.interviewer.id}
    
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />
      )}
      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}
           {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment."
          onClose={back}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message="Could not cancel appointment."
          onClose={back}
        />
      )}
    </article>
  );
}