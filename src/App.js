import Home from './pages/Home';
import RaspberryPi from './pages/RaspberryPi';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import toasty from './images/spiderToasty.png';

function App() {
  return (
    <Router>
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/raspberrypi">
            <RaspberryPi />
          </Route>
        </Switch>
      </main>
      <div id="toasty">
        <img alt="" src={toasty} />
      </div>
    </Router>
  );
}

export default App;
