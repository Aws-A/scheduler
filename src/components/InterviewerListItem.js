import React from "react";
import "components/InterviewStyles.scss";
import className from "classnames";

export default function InterviewerListItem(props) {
  const interviewerClass = className("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  ); 
}