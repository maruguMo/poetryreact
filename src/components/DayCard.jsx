import React, {useEffect, useState} from 'react'
import HourCard from './HourCard.jsx';
import './DayCard.css';
import { extractMajorColor} from './utils/ImgProcessor.js';

// Define the hours of the day
const hoursOfDay = Array.from({ length: 24 }, (_, i) => i);

const images=[
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
]
function getBgImage(){
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

function DayCard  (props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hourNow, setHourNow] = useState(new Date().getHours())
  const [bgImage, setBgImage] = useState(images[Math.floor(Math.random() * images.length)]);
  const [complementaryColor, setComplementaryColor] = useState('black');
  const [majorColor, setMajorColor]=useState();
  
  const bgStyle=props.isToday? {
                                backgroundImage: `url(${bgImage})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundColor:majorColor, 
                              }:{};

  useEffect(() => {
    extractMajorColor(bgImage, ({ majorColor, complementaryColor }) => {
      setMajorColor(majorColor);
      setComplementaryColor(complementaryColor);
    });
  
    const interval = setInterval(() => {
      setBgImage((prevBgImage) => {
        const newBgImage = getBgImage();

        // console.log(newBgImage,prevBgImage);

        extractMajorColor(newBgImage, ({ majorColor, complementaryColor }) => {
          setMajorColor(majorColor);
          setComplementaryColor(complementaryColor);
        });

        return newBgImage !== prevBgImage ? newBgImage : prevBgImage;
      });
    }, 1800000 ); // Change every 24h 86400000
  
    return () => clearInterval(interval); // Cleanup on unmount
  }, [bgImage]); // Empty dependency array ensures it runs only once
  

  useEffect(()=>{
  const interval = setInterval(() => {
      const newHour=new Date().getHours();
      if(newHour !==hourNow){
        setHourNow(new Date().getHours());
      }
    }, 36000); 
   clearInterval(interval); // Cleanup on unmount
  },[hourNow])
  function toggleExpand() {
    if(!isExpanded){
      setIsExpanded(true); 
    }
    setHourNow(new Date().getHours());
  }
  function closeCard(e) {
    e.stopPropagation(); // Prevent parent div from receiving the event
    setIsExpanded(false);
  }


  return (
         <div 
         
              className ={`the-day transition-all duration-300 ${isExpanded?"expanded":"collapsed"} 
                            ${props.isToday? "today":""} 
                             ${!isExpanded && props.isToday? "today-hover":""}`}

              style = {bgStyle}
              
              onClick={toggleExpand}
         >
            <p className={`day-header 
                          ${isExpanded? "day-header-sticky":""}
                          ${props.isToday? "today-font":""}`}>
                  {isExpanded ? (props.day+' '+ props.month): props.day} 
                  {isExpanded && (
                      <button className="close-btn" 
                              onClick={closeCard}>
                              <strong>X</strong> 
                      </button>
                  )}                  
            </p>          
            <div className={"hours-of-day"} >
              {isExpanded && (hoursOfDay.map((hour) => {
                const isNow=hourNow===hour;
                return(
                <HourCard key={hour} 
                          hour={hour}
                          isNow={isNow} 
                          majorColor={majorColor}
                          complementaryColor={complementaryColor}
                          isToday={props.isToday}
                          className="hour-card-expanded"
                />
              )}))}
            </div>
        </div>    
  )
}
export default DayCard;