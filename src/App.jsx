import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Calendar 
                width={70}
        />
      </header>
    </div>
  );
}

export default App;
