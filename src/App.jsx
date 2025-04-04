// import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import Calendar from './components/Calendar'
import PoetryAppBar from './components/PoetryAppBar';
// import AppSideBar from './components/AppSideBar.jsx';
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from '@mui/material/Typography';
import isCloseToWhite from './components/utils/isCloseToWhite.js'; // Ensure this utility is custom or properly licensed
import {getBgImage} from './components/utils/bgImage.js'
import { AppProvider,useAppContext } from './components/AppContext';
import QuoteOfDay from './components/QuoteOfDay.jsx';
import PoemList from './components/PoemList.jsx';
import './App.css';


function App() {
  const {bgImage,complementaryColor,majorColor, selectedDate,
          updateTheme,daysQuote,calendarWidth,calWidthUnits,
          calendarHeight,calHeigtUnits, isSmallScreen}=useAppContext();
  const [hovered, setHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(isSmallScreen? false : true);
  const [expandedQuote, setExpandedQuote]=useState(isSmallScreen?false : true);

  const handleToggle = () => {
      setIsExpanded(prev => !prev);
  };
  const handleToggleQuote=()=>{
    setExpandedQuote(prev => !prev);
  }
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

  const poetryCalendarTitle = React.useMemo(() => (
    <Typography
      variant='h6'
      sx={{
        fontFamily: `"Exo 2", sans-serif`,
        fontStyle: 'Large',
        fontWeight: 300,
        backgroundColor: 'lightgray',
        borderRadius: '5%',
        marginBottom: '3px',
        width: `${calendarWidth -(0.109 * calendarWidth)}${calWidthUnits }`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign:'center'
      }}
    >
      POETRY CALENDAR
    </Typography>
  ), []);

  // const companionFAB=React.useMemo(()=>(

  // ), []);
  
  return (
      <div className="App" 
          style={{
                    backgroundImage:`url(${bgImage})`,
                    backgroundColor:`${majorColor}`,
                    backgroundRepeat:'no-repeat, no-repeat',
                    backgroundSize: isSmallScreen?'100% 100%':'100%',
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
          <div className="poetry-calendar"
            style={{
                    width: `${calendarWidth}${calWidthUnits}`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    height:'98dvh'
                   }}>
            <div className="poetry-calendar-top">
                  <div className="fab-and-title"
                         style={{
                                 backgroundColor:'lightgray',
                                 border:'1px solid lightgray',
                                 borderRadius:'3%' ,
                                }}
                  >
                    {poetryCalendarTitle}
                    <Fab 
                      size='small'
                      variant='contained'
                      color="primary" 
                      onClick={handleToggle}
                      style={{ position: "relative", top: 0, zIndex:200}}
                    >
                      {isExpanded ? <RemoveIcon /> : <AddIcon />}
                    </Fab>
                  </div>
                  {React.useMemo(() => isExpanded && ( 
                    <div className="cal-actual"
                          style={{
                            height: `${calendarHeight}${calHeigtUnits}`,
                          }}
                    >
                    <Calendar 
                        key={1}
                        width={calendarWidth}
                        widthUnits={calWidthUnits}
                        height={calendarHeight}
                        heightUnits={calHeigtUnits}
                    />
                  </div>
                  ))}
            </div>
            <div className="poetry-calendar-bottom"
              style={{
                marginTop:'5px',
                position:'relative',
              }}
            >
            <PoemList
              viewMode="list"
              title="Featured poems"
            />
            </div>
          </div>
        </div>
        {isSmallScreen ? (<div style={{display:'flex', position:'relative', flexDirection:'row', justifyContent:'space-evenly', alignItems:'center', width:'100%'}}>
                            <div
                              style={{
                                display:'flex',
                                flexDirection:'row',
                                alignItems:'center',
                                position:'fixed',
                                flexDirection:'row',
                                justifyContent:'center',
                                bottom:0,
                                right:25,
                                backgroundColor: expandedQuote?'black':'transparent',
                                color:'white',
                                borderBottomLeftRadius: '15%',
                                borderTopLeftRadius:'15%',
                                paddingLeft:'10px',
                                textAlign:'center',
                                height:'40px',
                                width:'200px',
                                textAlign:'left',
                                
                              }}
                              >
                                 {expandedQuote &&<span>Quote of the Day</span>}
                              <Fab 
                                    size='small'
                                    
                                    style={{
                                      positon:'relative',
                                      bottom:0,
                                      left:'50%',
                                      transform:'translateX(-160%)',
                                      zIndex:1000,
                                      marginLeft:'25px',
                                    }}
                                    color="secondary" 
                                    onClick={handleToggleQuote}
                              >
                                {expandedQuote ? <RemoveIcon /> : <AddIcon />}
                              </Fab>

                            </div>
                            {expandedQuote && (<QuoteOfDay daysQuote={daysQuote} lumens={lumens} />)}
                          </div>) :( <QuoteOfDay daysQuote={daysQuote} lumens={lumens} isExpanded={expandedQuote} />)}
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
