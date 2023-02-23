import React from 'react';
import "./styles.scss";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";


export default function Appointment(props) {
  let interviewer = "";

  if (props.interview) interviewer = props.interview.interviewer.name;
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? 
        <Show 
         interview={props.interview}
         student={props.interview.student}
         interviewer={interviewer}
        /> 
      : 
        <Empty />
      }
    </article>
  );
};