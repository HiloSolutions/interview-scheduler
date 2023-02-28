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
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    
    props.bookInterview(props.id, interview)
      .then((res) => {
        console.log('res',res);
        transition(SHOW);
      })
    }

    const onConfirm = () => {
      transition(CONFIRM);
      //cancel();
    }
    //delete interview
    const cancel = () => {
      transition(DELETING);
      props.deleteInterview(props.id, props.interview)
        .then((res) => {
          console.log('res',res);
          transition(EMPTY);
        })
    }

  return (
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={onConfirm}
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
          <Confirm/>
        )}
        {mode === DELETING && (
          <Status
          message="Deleting"
        />
        )}
      </article>
    );
  };