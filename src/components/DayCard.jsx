import React, {useState, } from "react";
import { useAppContext } from "./AppContext.js";

import "./DayCard.css";

function DayCard(props) {
  const {bgImage, majorColor, handleDayClick } = useAppContext();
  const [isSelectedCard, setIsSelectedCard] = useState(false);

  function handleClick() {
    setIsSelectedCard(true);
    console.log("card selected: ",isSelectedCard);
    console.table(props);
    handleDayClick(props.day,props.month,props.year);
  }

  const bgStyle = props.isToday
    ? {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: majorColor,
        cursor: "pointer",
        backgroundAttachment: "scroll",
      }
    : {};

  return (
    <div
      className={`the-day today collapsed ${props.isToday ? "today-font" : ""}
                 ${isSelectedCard ? "selected-card":""} `}
      style={bgStyle}
      onClick={handleClick}
    >
      <p style={{margin:0}}
        className={`day-header ${props.isToday ? "today-font" : ""}`}
      >
        {props.day +' ' }
        {props.isLastDayOfWeek && <span style={{fontSize:'small'}}>⭐</span>}
      </p>
    </div>
  );
}

export default React.memo(DayCard);
