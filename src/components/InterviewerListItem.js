import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";



export default function InterviewerListItem(props) {

  function showName() {
    return props.selected ? props.name : '';
  }

  const interviewerListItemClass = classNames(
    'interviewers__item',
    { 'interviewers__item--selected ': props.selected }
  )

  return (
    <li
      className={interviewerListItemClass}
      onClick={props.onChange}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {showName()}
    </li>
  );
}