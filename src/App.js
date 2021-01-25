import Home from './home/Home';
import RaspberryPi from './raspberry-pi/RaspberryPi';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.css';
import toasty from './spiderToasty.png';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/raspberrypi">
            <RaspberryPi />
          </Route>
        </Switch>
        <div id="toasty">
          <img alt="" src={toasty} />
        </div>
      </div>
    </Router>
  );
}

export default App;
