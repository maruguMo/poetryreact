import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import HourCard from "./HourCard.jsx";
import DayCardHeader from "./DayCardHeader.jsx";

import { colorExtractor } from './utils/ImageProcessor.js'; // Refactored 

import "./DayCard.css";
// Define the hours of the day
const hoursOfDay = Array.from({ length: 24 }, (_, i) => i);
//#region images paths 
      const images = [
        "/bgimages/bg1.png",
        "/bgimages/bg2.png",
        "/bgimages/bg3.png",
        "/bgimages/bg4.png",
        "/bgimages/bg5.png",
        "/bgimages/bg6.png",
        "/bgimages/bg7.png",
        "/bgimages/bg8.png",
        "/bgimages/bg9.png",
        "/bgimages/bg10.png",
        "/bgimages/bg11.png",
        "/bgimages/bg12.png",
        "/bgimages/bg13.png",
        "/bgimages/bg14.png",
        "/bgimages/bg15.png",
        "/bgimages/bg16.png",
        "/bgimages/bg17.png",
        "/bgimages/bg18.png",
        "/bgimages/bg19.png",
        "/bgimages/bg20.png",
        "/bgimages/bg21.png",
        "/bgimages/bg22.png",
        "/bgimages/bg24.png",
        "/bgimages/bg25.png",
        "/bgimages/bg27.png",
        "/bgimages/bg28.png",
        "/bgimages/bg29.png",
      ];
//#endregion
function getBgImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

function DayCard(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hourNow, setHourNow] = useState(new Date().getHours());
  const [bgImage, setBgImage] = useState(getBgImage());
  const [complementaryColor, setComplementaryColor] = useState('rgb(0,0,0)');
  const [majorColor, setMajorColor] = useState();

  // Refactored image processing with graceful failure
  const processImageColors = async (image) => {
    try {
      const { majorColor, complementaryColor } =  await colorExtractor.extract(image)
        // console.log("Color extracted:", colorData);
        setMajorColor(majorColor);
        setComplementaryColor(complementaryColor);


    } catch (error) {
      console.error("Image processing failed:", error);
      setMajorColor("rgb(124, 124, 124)");
      setComplementaryColor("rgb(0,0,0)'");
    }
  };

  // Change background on load
  useEffect(() => {
    processImageColors(bgImage);
  }, [bgImage]);

  // Automatically change background every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage((prevBgImage) => {
        const newBgImage = getBgImage();
        if (newBgImage !== prevBgImage) {
          processImageColors(newBgImage);
          return newBgImage;
        }
        return prevBgImage;
      });
    }, 86400000);

    return () => clearInterval(interval);
  }, []);

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
    if (!isExpanded) {
      setIsExpanded(true);
    }
    setHourNow(new Date().getHours());
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
      className={`the-day ${isExpanded ? "expanded" : "collapsed"} 
                  ${props.isToday ? "today" : ""}`}
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
        {isExpanded ? props.day + " " + props.month : props.day}

        {isExpanded && (
          <button className="close-btn" onClick={closeCard}>
            <strong>X</strong>
          </button>
        )}
        {(!isExpanded && props.isLastDayOfWeek) ?<span>⭐</span>:""}
      </p>
      { isExpanded && (
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
        }      
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
