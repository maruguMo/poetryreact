import React,{useRef, useEffect} from "react";
import { isCloseToWhite } from "./utils/ImgProcessor";
import './HourCard.css';
function HourCard ( props) {
    const hourRef = useRef(null);

    useEffect(() => {
      if (props.isNow && hourRef.current) {
        hourRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, [props.isNow]); // Runs when isNow changes   
    const bgStyle=props.isToday?{
        //set fore color to black if complementary color is close to white else make the color white
        color:isCloseToWhite(props.complementaryColor)? 'rgb(0,0,0)':'white', 
        backgroundColor:props.complementaryColor,
    }:{};

  return (
    <div
        ref={hourRef} 
        className={`hour-card ${props.isNow ? "hour-now":""}`}
        role="button"
        tabIndex={0}
    >
      <span
        className="p-header"

        style={bgStyle}
      >
          {props.hour<10?`0${props.hour}:00`: `${props.hour}:00` }
      </span>
    </div>
  );
};

export default HourCard;