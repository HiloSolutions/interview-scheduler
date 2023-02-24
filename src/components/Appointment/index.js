import React from 'react';
import "./styles.scss";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import useVisualMode from "../../hooks/useVisualMode";

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
    </article>
  );
};