// import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import Calendar from './components/Calendar'
import PoetryAppBar from './components/PoetryAppBar';
import isCloseToWhite from './components/utils/isCloseToWhite.js';
import {getBgImage} from './components/utils/bgImage.js'
import { AppProvider,useAppContext } from './components/AppContext';
import QuoteOfDay from './components/QuoteOfDay.jsx';
import { useMediaQuery } from '@mui/material';
import './App.css';


function App() {
  const {bgImage,complementaryColor,majorColor, selectedDate,updateTheme,daysQuote}=useAppContext();
  const [hovered, setHovered] = useState(false);


  // Change background on load
  useEffect(() => {
    const {bgImage,quote}=getBgImage()
    updateTheme(bgImage, quote);
  },[]);

  useEffect(() => {
    if (selectedDate) {
        console.log("Ancestor App notified of click on:", selectedDate);
        // Ancestor now knows of the click event in descendant
    }
  }, [selectedDate]);
  
  const lumens = React.useMemo(() => isCloseToWhite(majorColor), [majorColor]);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const calendarWidth=isSmallScreen?95:30;
  const calWidthUnits=isSmallScreen ? 'dvw':'dvw';
  
  return (
      <div className="App" 
          style={{
                    backgroundImage:`url(${bgImage})`,
                    backgroundColor:`${majorColor}`,
                    backgroundRepeat:'no-repeat, no-repeat',
                    backgroundSize:'100%',
                    backgroundPosition:'center center',
                    backgroundBlendMode:hovered?'normal':'luminosity',
                    border:`1px solid ${complementaryColor}`,
                    borderRadius:'1%',
                    // opacity:'0.462',
                }}
                onMouseEnter={()=>setHovered(true)}
                onMouseLeave={()=>setHovered(false)}
      >
        <header className="App-header">
          <PoetryAppBar/>
        </header>
        <div className="app-parts">
          <Calendar 
              key={1}
              width={calendarWidth}
              widthUnits={calWidthUnits}
              height={40}
              heightUnits={"dvh"}
          />
        </div>
        <QuoteOfDay daysQuote={daysQuote} lumens={lumens} />
      </div>
  );
}

function WrappedApp(){
    return(
      <AppProvider>
        <App />
      </AppProvider>
    )
}
export default React.memo(WrappedApp);
