// import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Calendar 
                width={50}
                widthUnits={"dvw"}
                height={90}
                heightUnits={"dvh"}
        />
      </header>
    </div>
  );
}

export default App;
