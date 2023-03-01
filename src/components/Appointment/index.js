import React from 'react';
import "./styles.scss";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import Form from './Form';
import Confirm from 'components/Appointment/Confirm'
import Status from 'components/Appointment/Status'
import Error from 'components/Appointment/Error'
import useVisualMode from "../../hooks/useVisualMode";

//mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  //SHOW & EMPTY modes
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //Transition to CREATE mode
  const onAdd = () => {
    transition(CREATE);
  }
  //Back to empty mode
  const onCancel = () => {
    back();
  }

  //Save interview (save appt)
  const save = (name, interviewer) => {
    if(!interviewer || !name) {
      return;
    }
    
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
      .then((res) => transition(SHOW))
      .catch((err) => transition(ERROR_SAVE, true))
  };

  //delete interview
  const cancelInterview = () => {
    transition(DELETING);
    props.deleteInterview(props.id, props.interview)
      .then((res) => {
        transition(EMPTY);
      })
      .catch((err) => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && props.interview.interviewer && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          onSave={save}
          onCancel={onCancel}
          interviewers={props.interviewers}
        />
      )}
      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onCancel={onCancel}
          onConfirm={cancelInterview}
          message="Are you sure you would like to delete?"
        />
      )}
      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}
      {mode === EDIT && (
        <Form
          onSave={save}
          onCancel={onCancel}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Save Error"
          onClose={() => console.log("save err")}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Delete Error"
          onClose={() => console.log("delete err")}
        />
      )}
    </article>
  );
};