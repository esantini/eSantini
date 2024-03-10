import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Nav from 'components/Nav';
import TopMenu from 'components/TopMenu';
import Home from 'pages/Home';
import Login from 'pages/auth/Login';
import RaspberryPi from 'pages/RaspberryPi';
import CameraStream from 'pages/CameraStream';

import { fetchUser } from 'utils';

import toasty from 'images/spiderToasty.png';

const CLIENT_ID = '482181895955-i27hea4kgp5s8u67gvsgl56k7t1l966s.apps.googleusercontent.com';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Router>
        <main>
          <TopMenu user={user} setUser={setUser} />
          <Switch>
            <Route exact path="/">
              <Home user={user} />
            </Route>
            <Route path="/raspberrypi">
              <Nav />
              <RaspberryPi />
            </Route>
            <Route path="/camera">
              <Nav />
              <CameraStream user={user} />
            </Route>
            <Route path="/login">
              <Nav />
              <Login user={user} setUser={setUser} />
            </Route>
          </Switch>
        </main>
        <div id="toasty">
          <img alt="Konami Code" src={toasty} />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
