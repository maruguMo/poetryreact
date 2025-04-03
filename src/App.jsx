// import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import Calendar from './components/Calendar'
import PoetryAppBar from './components/PoetryAppBar';

import {getBgImage} from './components/utils/bgImage.js'
import { AppProvider,useAppContext } from './components/AppContext';
import './App.css';


function App() {
  const {bgImage,complementaryColor,majorColor, selectedDate,updateTheme}=useAppContext();
  const [hovered, setHovered] = useState(false);


  // Change background on load
  useEffect(() => {
    updateTheme(getBgImage());
  },[]);

  useEffect(() => {
    if (selectedDate) {
        console.log("Ancestor App notified of click on:", selectedDate);
        // Ancestor now knows of the click event in descendant
    }
  }, [selectedDate]);

  return (
      <div className="App" 
          style={{
                    backgroundImage:`url(${bgImage})`,
                    backgroundColor:`${majorColor}`,
                    backgroundRepeat:'no-repeat, no-repeat',
                    backgroundSize:'30%',
                    backgroundPosition:'center right',
                    backgroundBlendMode:hovered?'color-burn':'darken',
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
              width={35}
              widthUnits={"dvw"}
              height={55}
              heightUnits={"dvh"}
          />
        </div>
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
