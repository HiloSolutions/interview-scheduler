import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";



export default function DayListItem(props) {
  let spots = props.spots;

  function formatSpots() {
    if(spots === 0) {
      return "no spots remaining"
    } else if (spots === 1) {
      return "1 spot remaining"
    } else {
      return `${spots} spots remaining`
    }
  }
  
  const dayListItemClass = classNames(
    'day-list__item', 
    {
      'day-list__item--selected ': props.selected,
      'day-list__item--full': spots === 0
    }
  )

  return (
    <li 
      className={dayListItemClass}
      onClick={() => props.onChange(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}