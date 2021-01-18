import logo from './logo.svg';
import toasty from './spiderToasty.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br />
        <a
          className="App-link"
          href="https://github.com/esantini/eSantini"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello World
        </a>
        <p className="home-desc">
          Hosting this website on a Raspberry Pi is the first thing I decided to do when I got it as a birthday gift from my fiancee 
        </p>
      </header>
      <div id="toasty">
        <img alt="" src={toasty} />
      </div>
    </div>
  );
}

export default App;
