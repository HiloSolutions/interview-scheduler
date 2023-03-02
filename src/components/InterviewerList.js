import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem.js";
import PropTypes from 'prop-types'; 

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((i) => {
    return(
      <InterviewerListItem
      key={i.id}
      name={i.name}
      avatar={i.avatar}
      selected={props.interviewer === i.id}
      onChange={() => props.onChange(i.id)}
      />
    )
  })
 
  return (
    <ul className="interviewers__list">{interviewers}</ul>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};