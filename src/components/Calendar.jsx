import React, {useMemo} from "react";
import { nanoid } from 'nanoid'
import DayCard from "./DayCard";
import "./Calendar.css"; // Import CSS for styling
import CalendarHeader from "./CalendarHeader";
import { useAppContext } from "./AppContext.js";

function Calendar (props) {

  const [year, setYear] = React.useState(new Date().getFullYear());
  const [month, setMonth] = React.useState(new Date().getMonth());
  const [monthName, setMonthName]=React.useState(()=>(new Date(year, month).toLocaleString("default", { month: "long" })) + ' ' + year);
  const [dates, setDates] = React.useState([]);
  const [today, setToday] =React.useState(new Date())
  const headerRef=React.useRef(null);
  const [subHeaderTop, setSubheaderTop]=React.useState();
  const [numRows, setNumRows]=React.useState();
  const {complementaryColor,majorColor, calendarWidth,calWidthUnits,
          calendarHeight,calHeightUnits}=useAppContext();

  const getCurrentMonthDates = useMemo(() => {
    return (year, month) => {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);

      const firstDayOfWeek = startDate.getDay();
      const lastDateOfMonth = endDate.getDate();

      const datesInMonth = [];
      let currentDate = 1;

      for (let i = 0; i < firstDayOfWeek; i++) {
        datesInMonth.push({ date: null, id: nanoid() });
      }

      while (currentDate <= lastDateOfMonth) {
        datesInMonth.push({ date: currentDate++, id: nanoid() });
      }

      const extraSlots = datesInMonth.length % 7;
      if (extraSlots !== 0) {
        for (let i = extraSlots; i < 7; i++) {
          datesInMonth.push({ date: null, id: nanoid() });
        }
      }
      const calRows = parseInt(datesInMonth.length / 7);

      setNumRows(calRows);
      return datesInMonth;
    };
  }, []);

  const getLastDayOfWeek = useMemo(() => {
    return (y, m, d) => {
      if (typeof y !== 'number' || typeof m !== 'number' || typeof d !== 'number') {
        throw new Error("Year, month, and day must be numbers");
      }

      if (y < 2020) {
          throw new Error("Year cannot be less than 2020");
      }

      if (m < 0 || m > 11) {
        throw new Error("Month must be between 0 (January) and 11 (December)");
      }

      if (d < 1 || d > 31) {
        throw new Error("Day must be between 1 and 31");
      }
      const date= new Date(y,m,d);
      return date.getDate() - (date.getDay() - 1) + 5;
    };
  }, []);
  

  React.useEffect(()=>{
    if (headerRef.current){
      setSubheaderTop(headerRef.current.offsetHeight)
    }

  },[])

  React.useEffect(() => {
    setMonthName(new Date(year, month).toLocaleString("default", { month: "long" }) + " " + year);
    setDates(getCurrentMonthDates(year, month));
    setToday(new Date());
  }, [year, month]);

  function handlePrev() {
    setMonth((prev) => {
        if (year === 2020 && prev === 0) {
            return 0; // Prevent traveling back before Jan 2020
        }
        if (prev === 0) {
            setYear(year - 1); // Move to last year if January
            return 11; // Switch to December
        }
        return prev - 1;
    });
}
  
  function handleNext() {
    setMonth((prev) => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      // Prevent going beyond the current month in the current year
      if (year === currentYear && prev === currentMonth) {
          return prev; // Stay on the current month
      }
      if (prev === 11) {
        setYear( year + 1); // Go to next year if December
        return 0; // Switch to January
      }
      return prev + 1;
    });
  }
  const rowHeight=props.height/numRows;
  const colWidth=props.width/7;

  const calStyle={
    width: `${calendarWidth}${calWidthUnits}`,
    height:`${calendarHeight}${calHeightUnits}`,
    backgroundColor:majorColor,
 
  }
  // console.log('calStyle', calStyle);
  const headerStyle={
    width:`${colWidth*7}${props.widthUnits}`
  }

  const gridStyle= {
        // display:'grid',
        gridTemplateColumns: `repeat(7, ${colWidth}dvw)`,//${props.widthUnits}
        height:'100%',
        // gridAutoRows: `${rowHeight}dvh`,//${props.heightUnits},
        border:`0.45px solid grey`,
        borderRadius:'2%',
        backgroundColor:'lightgray',
        boxShadow:`0px 10px 10px ${complementaryColor}`
       
  };
  // const cellStyle={
  //     height:`${rowHeight}${props.heightUnits}`, 
  // }
  return (
    <div  className="calendar"
          style={calStyle}
    >
      {/* Header */}
      <div ref={headerRef} 
        className="header"
        style={{...headerStyle}}
      >
        <button 
            onClick={handlePrev}>
            <strong>{'<'}</strong> 
        </button>
        <div className="datebox">
            <div className="center-items">
                <CalendarHeader
                  currentYear={year}
                  currentMonth={month}
                  onDateChange={(year, month) => {
                    setYear(year);
                    setMonth(month);
                  }}
                
                />
            </div>
            <div className="end-items">
                <span>{year}/</span>
                <span>{new Date(year, month).toLocaleString("default", { month: "long" }) + ' '}</span>
            </div>
            
        </div>
        <button 
              style={{marginRight:'10px', padding: '3px 10px'}}
              onClick={handleNext}>
              <strong>{'>'}</strong> 
        </button>
      </div>

      {/* Days of the Week */}
      <div className="days-of-week"
           style={{ top: `${subHeaderTop}px`,
                    gridTemplateColumns: `repeat(7, ${colWidth}dvw)`,
                }}
          key={nanoid()}
      >
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
      </div>
      <div className="grid"
          style={gridStyle}
      >

        {dates.map((date, index) => {
          // let isToday;
          if(date.date){
            const isToday = date.date === today.getDate() && 
                      month === today.getMonth() && 
                      year === today.getFullYear();
            const isLastDayOfWeek=date.date===getLastDayOfWeek(year,month, date.date);

            return(
                  <div key={nanoid()} 
                        className={`cell`}
                  >
                      <div  className={`fill-cell`}>
                            <DayCard
                                day={date.date}
                                monthName={monthName}
                                month={month}
                                year={year}
                                isToday={isToday}
                                isLastDayOfWeek={isLastDayOfWeek}
                                onDayCardData={props.onDayCardData}  
                            />
                      </div>
                  </div>
            )
          }else{
            return (
              <div key={date.id}>
                  <div className={`cell empty`}
                      // style={cellStyle}
                  >
                    {/* <span>empty</span> */}
                  </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  );
};

export default React.memo(Calendar);