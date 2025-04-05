import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { colorExtractor } from './utils/ImageProcessor.js'; // Refactored 
import { getBgImage } from './utils/bgImage.js';
import { useMediaQuery } from '@mui/material';

// Step 1: Create context
const AppContext = createContext();

// Step 2: Create provider component
export function AppProvider({ children }) {
    const [bgImage, setBgImage] = useState();
    const [majorColor, setMajorColor] = useState('bisque');
    const [complementaryColor, setComplementaryColor] = useState('rgb(0,0,0)');
    const [selectedDate, setSelectedDate] = useState(new Date()); // For descendant -> ancestor to initial value to today
    const [daysQuote, setDaysQuote] = useState();
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const [calendarWidth, setCalendarWidth] = useState(isSmallScreen ? 98 : 25);
    const [calWidthUnits, setCalWidthUnits] = useState('dvw');
    const [calendarHeight, setCalendarHeight] = useState(isSmallScreen ? 22 : 30);
    const [calHeightUnits, setCalHeightUnits] = useState('dvh');

    // Function to change only image and the context will handle the rest
    const updateTheme = (image, quote) => {
        setBgImage(image);
        setDaysQuote(quote);
    };

    // Function to update context from DayCard
    const handleDayClick = (d,m,y) => {
        console.log("y: ",y, "m:",m, "d:",d );
        if (typeof y !== 'number' || typeof m !== 'number' || typeof d !== 'number') {
            return;
          }
          if (y < 2020) {
            return;
          }
      
          if (m < 0 || m > 11) {
            return;
          }
          if (d < 1 || d > 31) {
            return;
          }         
        const newDate=new Date(y,m,d);
        setSelectedDate(newDate);
        // console.log("Ancestor App notified of click on:", newDate);
    };

    const processImageColors = async (image) => {
        try {
            const { majorColor, complementaryColor } = await colorExtractor.extract(image);
            setMajorColor(majorColor);
            setComplementaryColor(complementaryColor);
        } catch (error) {
            console.error("Image processing failed:", error);
            setMajorColor("rgb(124, 124, 124)");
            setComplementaryColor("rgb(0,0,0)");
        }
    };

    // Change background on load
    useEffect(() => {
        const calWidth = isSmallScreen ? 98 : 25;
        const calWidthUnts = 'dvw';
        const calHeight = isSmallScreen ? 25 : 35;
        const calHeightUnts = 'dvh';
        setCalendarWidth(calWidth);
        setCalWidthUnits(calWidthUnts);
        setCalendarHeight(calHeight);
        setCalHeightUnits(calHeightUnts);
    }, [isSmallScreen]);

    useEffect(() => {
        processImageColors(bgImage);
    }, [bgImage]);

    // Automatically change background every 24 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            setBgImage((prevBgImage) => {
                const { newBgImage, quote } = getBgImage();
                setDaysQuote(quote);
                if (newBgImage !== prevBgImage) {
                    processImageColors(newBgImage);
                    return newBgImage;
                }
                return prevBgImage;
            });
        }, 86400000);

        return () => clearInterval(interval);
    }, []);

    // Memoize context values
    const contextValue = useMemo(() => ({
        bgImage,
        majorColor,
        complementaryColor,
        selectedDate,
        daysQuote,
        updateTheme,
        handleDayClick,
        calendarWidth,
        calWidthUnits,
        calendarHeight,
        calHeightUnits,
        isSmallScreen,
    }), [
        bgImage,
        majorColor,
        complementaryColor,
        selectedDate,
        daysQuote,
        calendarWidth,
        calWidthUnits,
        calendarHeight,
        calHeightUnits,
        isSmallScreen,
    ]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}

// Step 3: Custom hook to use context
export const useAppContext = () => useContext(AppContext);