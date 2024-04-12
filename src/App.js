import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { CornerLogo, NavMenu, Chat, PageAnalytics, MyDebugger } from 'components';
import Home from 'pages/Home';
import Login from 'pages/Login';
import RaspberryPi from 'pages/RaspberryPi';
import CameraStream from 'pages/CameraStream';
import Analytics from 'pages/Analytics';

import { fetchUser, useUser } from 'utils';

import toasty from 'assets/images/spiderToasty.png';

const CLIENT_ID = '482181895955-i27hea4kgp5s8u67gvsgl56k7t1l966s.apps.googleusercontent.com';

function App() {
  const [, setUser] = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUser(setUser, setIsLoading);
  }, []);

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Router>
        <PageAnalytics />
        <main>
          <NavMenu isLoading={isLoading} />
          <CornerLogo />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/raspberrypi" component={RaspberryPi} />
            <Route path="/camera" component={CameraStream} />
            <Route path="/login" component={Login} />
            <Route path="/analytics" component={Analytics} />
            <MyDebugger />
          </Switch>
        </main>
        <div id="toasty">
          <img alt="Konami Code" src={toasty} loading="lazy" />
        </div>
      </Router>
      <Chat />
    </GoogleOAuthProvider>
  );
}

export default App;
