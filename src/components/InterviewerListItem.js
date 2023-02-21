import React, { useState } from "react";
import classNames from "classnames";
import "components/InterviewerList.scss";

export default function InterviewerListItem() {
  const [selectionStatus, setSelectionStatus] = useState(false);

  if (selectionStatus === true) {
    //highlight the item with a white background and show the name of the interviewer.
  } else {
    //showing only the image of the interviewer
  }
  return (
    <form></form>
  );
}