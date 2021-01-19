import Home from './home/Home';
import toasty from './spiderToasty.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Home />
      </header>
      <div id="toasty">
        <img alt="" src={toasty} />
      </div>
    </div>
  );
}

export default App;
