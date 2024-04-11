import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { CornerLogo, NavMenu, Chat, PageAnalytics, MyDebugger } from 'components';
import Home from 'pages/Home';
import Login from 'pages/Login';
import RaspberryPi from 'pages/RaspberryPi';
import CameraStream from 'pages/CameraStream';
import Analytics from 'pages/Analytics';

import { fetchUser } from 'utils';

import toasty from 'assets/images/spiderToasty.png';

const CLIENT_ID = '482181895955-i27hea4kgp5s8u67gvsgl56k7t1l966s.apps.googleusercontent.com';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUser(setUser, setIsLoading);
  }, []);

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Router>
        <PageAnalytics />
        <main>
          <NavMenu user={user} setUser={setUser} isLoading={isLoading} />
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
            <Route path="/analytics" >
              <Analytics user={user} />
            </Route>
            <MyDebugger />
          </Switch>
        </main>
        <div id="toasty">
          <img alt="Konami Code" src={toasty} loading="lazy" />
        </div>
      </Router>
      <Chat user={user} />
    </GoogleOAuthProvider>
  );
}

export default App;
