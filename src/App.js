import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import CornerLogo from 'components/CornerLogo';
import TopMenu from 'components/TopMenu';
import Chat from 'components/Chat';
import PageAnalytics from 'components/PageAnalytics';
import Home from 'pages/Home';
import Login from 'pages/auth/Login';
import RaspberryPi from 'pages/RaspberryPi';
import CameraStream from 'pages/CameraStream';
import Analytics from 'pages/Analytics';

import { fetchUser } from 'utils';

import toasty from 'assets/images/spiderToasty.png';

const CLIENT_ID = '482181895955-i27hea4kgp5s8u67gvsgl56k7t1l966s.apps.googleusercontent.com';
const WEB_SOCKET_URL = 'esantini.com';
const CHAT_ENABLED = false;

function App() {
  const [user, setUser] = useState({});
  const [ws] = useState(CHAT_ENABLED ? new WebSocket(`wss://${WEB_SOCKET_URL}:8080`) : {});

  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Router>
        <PageAnalytics />
        <main>
          <TopMenu user={user} setUser={setUser} />
          <CornerLogo />
          <Switch>
            <Route exact path="/">
              <Home user={user} />
            </Route>
            <Route path="/raspberrypi" component={RaspberryPi} />
            <Route path="/camera">
              <CameraStream user={user} />
            </Route>
            <Route path="/login">
              <Login user={user} setUser={setUser} />
            </Route>
            <Route path="/analytics">
              <Analytics />
            </Route>
          </Switch>
        </main>
        <div id="toasty">
          <img alt="Konami Code" src={toasty} />
        </div>
      </Router>
      {CHAT_ENABLED &&
        <Chat user={user} ws={ws} />
      }
    </GoogleOAuthProvider>
  );
}

export default App;
