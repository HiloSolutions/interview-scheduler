import React from 'react';
import "./styles.scss";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";
import Form from './Form';

//mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

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
    const interview = {
      student: name,
      interviewer
    };
  
    props.bookInterview(props.id, interview)
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          onSave={save}
          onCancel={onCancel}
          interviewers={props.interviewers}
        />
      )}
    </article>
  );
};