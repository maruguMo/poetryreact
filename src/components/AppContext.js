// AppContext.js
import React, { createContext, useState,useEffect, useContext } from 'react';
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
    const [daysQuote, setDaysQuote]=useState();
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const [calendarWidth, setCalendarWidth]=useState(isSmallScreen?98:25);
    const [calWidthUnits, setCalWidthUnits]=useState('dvw');
    const [calendarHeight, setCalendarHeight]=useState(isSmallScreen?22:30);
    const [calHeightUnits, setCalHeightUnits]=useState('dvh');

    // Function so change only image and the contex will handle the rest
        const updateTheme = (image, quote ) => {
            //once the bgImage is changed, the useEffect will trigger the processing of image colors
            setBgImage(image);
            setDaysQuote(quote);
        };

        // Function to update context from DayCard
        const handleDayClick = (date) => {
            setSelectedDate(date);
            console.log("Ancestor App notified of click on:", date);
        };

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
        useEffect( () => {
        //check if its a small screen and size the component appropriately
            console.log(isSmallScreen);
            const calWidth=isSmallScreen?98:25;
            const calWidthUnts='dvw';
            const calHeight=isSmallScreen?30:30;
            const calHeightUnts='dvh';
            setCalendarWidth(calWidth);
            setCalWidthUnits(calWidthUnts);
            setCalendarHeight(calHeight);
            setCalHeightUnits(calHeightUnts);
            
        }, []);

        useEffect(() => {
            processImageColors(bgImage);
        }, [bgImage]);
    
        // Automatically change background every 24 minutes
        useEffect(() => {
            const interval = setInterval(() => {
            setBgImage((prevBgImage) => {
                const {newBgImage,quote} = getBgImage();
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

    return (
        <AppContext.Provider
            value={{
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
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

// Step 3: Custom hook to use context
export const useAppContext = () => useContext(AppContext);
