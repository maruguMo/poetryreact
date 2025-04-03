import React from "react";
import { Typography } from "@mui/material";

const QuoteOfDay = React.memo(({daysQuote, lumens})=>{
    return(
        <Typography
            variant="h6"
            sx={{
              backgroundColor:lumens? 'black': 'black',
              fontFamily:'Alegreya Sans, Roboto, sans-serif',
              color: 'white',
              padding: '10px',
              borderRadius: '8px', 
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              maxWidth: '300px',
              boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
              fontWeight:'light',
              fontStyle:'normal',
              fontSize:14,
              align:"left",
            }}
        >
            {'Todays Quoute: '+ daysQuote}
        </Typography>
    )
})

export default QuoteOfDay
