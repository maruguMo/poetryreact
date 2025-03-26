import React from "react";
import DayCard from "./DayCard";
import "./Calendar.css"; // Import CSS for styling

function Calendar (props) {

  const [year, setYear] = React.useState(new Date().getFullYear());
  const [month, setMonth] = React.useState(new Date().getMonth());
  const [monthName, setMonthName]=React.useState(()=>(new Date(year, month).toLocaleString("default", { month: "long" })) + ' ' + year);
  const [dates, setDates] = React.useState([]);
  const [today, setToday] =React.useState(new Date())
  const headerRef=React.useRef(null);
  const [subHeaderTop, setSubheaderTop]=React.useState();
  const [numRows, setNumRows]=React.useState();

  const getCurrentMonthDates = (year, month) => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);

    const firstDayOfWeek = startDate.getDay(); // Saturday = 6 (0-based, Sunday start)
    const lastDateOfMonth = endDate.getDate();

    const datesInMonth = [];
    let currentDate = 1;

    // Fill in the empty slots before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
        datesInMonth.push(null);
    }

    // Add the actual days of the month
    while (currentDate <= lastDateOfMonth) {
        datesInMonth.push(currentDate++);
    }

    // ✅ FIX: Ensure a complete last row
    const extraSlots = datesInMonth.length % 7;
    let calRows=parseInt(datesInMonth.length/7);
    if (extraSlots !== 0) {
        calRows+=1;
        for (let i = extraSlots; i < 7; i++) {
            datesInMonth.push(null);
        }
    }
    // console.log(calRows)
    setNumRows(calRows)
    return datesInMonth;
  };

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
      if (prev === 0) {
        setYear(  year - 1); // Go to last year if January
        return 11; // Switch to December
      }
      return prev - 1;
    });
  }
  
  function handleNext() {
    setMonth((prev) => {
      if (prev === 11) {
        setYear( year + 1); // Go to next year if December
        return 0; // Switch to January
      }
      return prev + 1;
    });
  }
 
  const rowHeight=90/numRows;
  const colWidth=props.width/7
  
  const gridStyle= {
        gridTemplateColumns: `repeat(7, ${colWidth}%)`,
        gridAutoRows: `${rowHeight}%`,  
  };
  return (
    <div className="calendar">
      {/* Header */}
      <div ref={headerRef} className="header">
        <button onClick={handlePrev}>{'<'}</button>
        <span>{monthName}</span>
        <button onClick={handleNext}>{'>'}</button>
      </div>

      {/* Days of the Week */}
      <div className="days-of-week"
           style={{ top: `${subHeaderTop}px` }}
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
          let isToday;
          if(date){
            isToday = date === today.getDate() && 
                      month === today.getMonth() && 
                      year === today.getFullYear();
            return(
                  <div key={index} 
                        className={`cell`}
                  >
                    <DayCard className={`fill-cell`}
                        key={index}
                        day={date}
                        month={monthName}
                        year={year}
                        isToday={isToday}  
                    />
                  </div>
            )
          }else{
            return (
              <div >
                  <div key={index} 
                      className={`cell empty`}
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

export default Calendar;