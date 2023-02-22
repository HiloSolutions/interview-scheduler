import React, { Fragment } from 'react';
import "./styles.scss";
//import Confirm from "./Confirm";
import Empty from "./Empty";
//import Error from "./Error";
//import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
//import Status from "./Status";



export default function Application(props) {
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