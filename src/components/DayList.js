import React from "react";
import "components/DayListItem.scss";
import "components/DayListItem.js";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  
  const days = props.days.map((day) => {
  

    return (
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={props.day === day.name}
        setDay={() => props.setDay(day.name)}
      />

    )
  });

  return (
    <ul>{days}</ul>
  );
}