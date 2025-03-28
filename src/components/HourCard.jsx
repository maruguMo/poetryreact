import React,{useRef, useEffect, useState} from "react";
import isCloseToWhite from "./utils/isCloseToWhite";
import './HourCard.css';
function HourCard ( props) {
    const hourRef = useRef(null);
    const [minutes, setMinutes] = useState(new Date().getMinutes());

    useEffect(() => {
      const interval = setInterval(() => {
        const min=new Date().getMinutes()
        setMinutes(min<10?`0${min}`:`${min}`);
      }, 60000); // Update every 60 seconds
    
      return () => clearInterval(interval);
    }, []);
    
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
    const hr = props.isToday ?
                                props.isNow ?
                                   `${props.hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2,"0")}`
                                  :`${props.hour}:00`
                            : `${props.hour}:00`;
  
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
          {hr}
      </span>
    </div>
  );
};

export default React.memo(HourCard);