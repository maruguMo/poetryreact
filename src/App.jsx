// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Calendar from './components/Calendar'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  );
}

export default React.memo(App);
