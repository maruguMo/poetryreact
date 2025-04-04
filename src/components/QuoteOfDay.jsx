import React from "react";
import { Typography } from "@mui/material";
import { useAppContext } from "./AppContext.js";

const QuoteOfDay = React.memo(({daysQuote, lumens, isExpanded})=>{
    const {complementaryColor,isSmallScreen}=useAppContext();
    const posStyle = {
        display: 'flex',
        alignItems:isSmallScreen? 'center':'flex-end', // Always align to the bottom
        bottom: isSmallScreen?'0':'20px',
        width: isSmallScreen ? '100dvw' : '300px', // Full width on small screens, auto on large
        top: isSmallScreen ? '88%' : '90%', 
        // transform: isSmallScreen ? 'translateY(-150%)' : 'translateY(-150)', 
        textAlign:isSmallScreen?"center":"left",
    };
    return(
        <Typography
            variant="h6"
            sx={{
              backgroundColor: 'black',
              fontFamily:'Alegreya Sans, Roboto, sans-serif',
              color: 'white',
              position:'fixed',
              borderRadius: '8px', 
              height:'fit-content',
              boxShadow: `0px 10px 10px ${complementaryColor}`,
              fontWeight:'light',
              fontStyle:'normal',
              fontSize:14,
              padding:'10px',
              left: '100%', 
              transform:'translateX(-100%)',
              zIndex:5,      
              ...posStyle
            }}
        >
            {daysQuote}
        </Typography>
    )
})

export default QuoteOfDay
