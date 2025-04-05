// Logo.js
import React from 'react';

function Logo({ width = 50, height = 50 }) {
    
    return (
        <img 
            src="./logo192.png" 
            alt="My Logo" 
            style={{
                width: `${width}px`,
                height: `${height}px`,
                objectFit: 'contain',
                borderRadius: '50%'
            }}
        />
    );
}

export default React.memo(Logo);
