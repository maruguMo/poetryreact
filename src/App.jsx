// import logo from './logo.svg';
import React from 'react';
import './App.css';

import Calendar from './components/Calendar'

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <Calendar 
                  key={1}
                  width={65}
                  widthUnits={"dvw"}
                  height={90}
                  heightUnits={"dvh"}
          />
        </header>
      </div>
  );
}

export default React.memo(App);
