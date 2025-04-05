import React, { useState, useEffect } from 'react';
import { MenuItem, Select, FormControl,} from '@mui/material';
import './CalendarHeader.css'

const years = Array.from({ length: (new Date().getFullYear()) - 2020 + 1 }, (_, index) => 2020 + index);
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function CalendarHeader({ currentYear, currentMonth, onDateChange }) {
    const [selectedYear, setSelectedYear] = useState(currentYear || new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(Number.isInteger(currentMonth) ? currentMonth : new Date().getMonth());
   

    useEffect(() => {
        setSelectedYear(currentYear || new Date().getFullYear());
        setSelectedMonth(Number.isInteger(currentMonth) ? currentMonth : new Date().getMonth());
    }, [currentYear, currentMonth]);

    const handleYearChange = (event) => {
        const newYear = event.target.value;
        setSelectedYear(newYear);
        setSelectedMonth(0);
        onDateChange(newYear, 0);
    };

    const handleMonthChange = (event) => {
        const newMonth = event.target.value;
        setSelectedMonth(newMonth);
        onDateChange(selectedYear, newMonth);
    };
    
    const todaysDate=new Date(); //get todays date
    //slice the months to todays date i.e.
    const availableMonths = selectedYear === todaysDate.getFullYear()
        ? months.slice(0, (todaysDate.getMonth()) + 1)
        : months;

    return (
        <div style={{marginBottom:'10px'}}>
            <FormControl variant="filled" 
                         margin='none'
                         hiddenLabel={true}
                         size='small'
                         sx={{ minWidth: 120, marginRight: 0, height: 30, fontSize:'small'}}>
                {/* <InputLabel>Year</InputLabel> */}
                <Select value={selectedYear} onChange={handleYearChange} sx={{fontSize:'small'}}>
                    {years.map((year) => (
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl variant="filled" 
                         margin='none'
                         hiddenLabel={true}
                         size='small'
                         sx={{ minWidth: 120, marginRight: 2 , height: 30  }}>
                {/* <InputLabel>Month</InputLabel> */}
                <Select value={selectedMonth} onChange={handleMonthChange} sx={{fontSize:'small'}}>
                    {availableMonths.map((month, index) => (
                        <MenuItem key={index} value={index}>{month}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default React.memo(CalendarHeader);
