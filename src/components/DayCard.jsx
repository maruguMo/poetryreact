import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import HourCard from "./HourCard.jsx";
import { useAppContext } from "./AppContext.js";

import "./DayCard.css";
// Define the hours of the day
const hoursOfDay = Array.from({ length: 24 }, (_, i) => i);

function DayCard(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hourNow, setHourNow] = useState(new Date().getHours());
  const { bgImage, majorColor, complementaryColor, handleDayClick } = useAppContext();
  const [selectedCard, setSelectedCard] = useState(false);

  // Track hour changes
  useEffect(() => {
    const interval = setInterval(() => {
      const newHour = new Date().getHours();
      if (newHour !== hourNow) {
        setHourNow(newHour);
      }
    }, 36000);

    return () => clearInterval(interval);
  }, [hourNow]);

  function toggleExpand() {
    setSelectedCard(true)
    if (!isExpanded) {
      setIsExpanded(true);
    }
    setHourNow(new Date().getHours());

    // handleDayClick({d:props.day,
    //   m:props.month,
    //   y:props.year,  

    // })
  }

  function closeCard(e) {
    e.stopPropagation();
    setIsExpanded(false);
  }

  function handleKeyDown(e) {
    if (e.keyCode === 27) {
      setIsExpanded(false);
    }
    e.stopPropagation();
  }

  const bgStyle = props.isToday
    ? {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: isExpanded? "60% 100%":"100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: isExpanded?'Top center':"center",
        backgroundColor: majorColor,
        cursor: "pointer",
        backgroundAttachment: "scroll",
      }
    : {};

  return (
    <div
      key={nanoid()}
      className={`the-day today ${isExpanded ? "expanded" : "collapsed"} 
                    ${selectedCard? "today" :""}
                   
                  `}
      style={bgStyle}
      onKeyDown={handleKeyDown}
      onClick={toggleExpand}
    >
      <p style={{margin:0}}
        className={`day-header 
                    ${isExpanded ? "day-header-sticky" : ""}
                    ${props.isToday ? "today-font" : ""}`}
        role="button"
        tabIndex={0}
        onClick={toggleExpand}
        onKeyDown={handleKeyDown}
        
      >
        {isExpanded ? props.day + " " + props.monthName : props.day}

        {isExpanded && (
          <button className="close-btn" onClick={closeCard}>
            <strong>X</strong>
          </button>
        )}
        {(!isExpanded && props.isLastDayOfWeek) ?<span>⭐</span>:""}
      </p>
       {/* {isExpanded && (
            <div style={{
                        color:'white', 
                        fontSize:"large",
                        textAlign:"justify",
                        display:"flex",
                        flexDirection: 'column',
                        margin:'0',
                    }}>
                      <DayCardHeader
                        compColor={complementaryColor}
                      />
                    <div
                      style={{display:'flex',
                              flexDirection:'row',
                              width:'100%',  
                              flex:'1',
                              margin:'0',
                            }}
                    >

                        {props.isLastDayOfWeek ? <button style={{
                                                              backgroundColor:complementaryColor, 
                                                              color:'white',
                                                              margin:'0',
                                                              flex:'1',
                                                            }}
                                                  >
                                                    Poem of the week ⭐
                                                  </button>:""}
                        <button style={{
                                    margin:'0', 
                                    color:'white',
                                    flex:'1',
                                    backgroundColor:complementaryColor, 
                                  }}>
                            Poem of the day ⭐
                        </button>
                        <button style={{
                                    margin:'0', 
                                    color:'white',
                                    flex:'1',
                                    backgroundColor:complementaryColor, 
                                  }}>
                            Featured ⭐
                        </button>
                    </div>                      
              <div>
                  <p style={{
                              marginBottom:"0",
                              textAlign:'center',
                              fontSize:'larger',
                              backgroundColor:complementaryColor, 
                            }}>
                    Poems by the hour
                  </p>
              </div>                          
            </div>
          )
        }       */}
      <div className={"hours-of-day"}>
        {isExpanded &&
          hoursOfDay.map((hour) => {
            const isNow = hourNow === hour;
            return (
              <HourCard
                key={hour}
                hour={hour}
                isNow={isNow}
                majorColor={majorColor}
                compColor={complementaryColor}
                isToday={props.isToday}
                header={false}
                className="hour-card-expanded"
              />
            );
          })}
      </div>
    </div>
  );
}

export default React.memo(DayCard);
