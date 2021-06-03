import React from 'react';
import { Route, Switch } from 'react-router';
import Welcome from './Welcome';
import Registration from './Registration';
import Confirm from './Confirm';
import Login from './Login';
import Dashboard from './Dashboard';
import Invite from './Invite';
import AfterInvite from './AfterInvite';
import Property from './Property';
import Authed from './Property/Authed.jsx';

import styles from './App.module.css';

function App({ isPropertyPage, isLogin }) {
  let homeComponent = Welcome;

  if (isPropertyPage) {
    homeComponent = isLogin ? Authed : Property;
  }

  return (
    <div className={styles.app}>
      <Switch>
        <Route exact path="/" component={homeComponent} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/confirm" component={Confirm} />
        <Route
          exact
          path="/login"
          render={(props) => (
            <Login {...props} isPropertyPage={isPropertyPage} />
          )}
        />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/invite" component={Invite} />
        <Route exact path="/afterInvite" component={AfterInvite} />
        <Route exact path="/authed" component={Authed} />
        <Route exact path="/property" component={Property} />
        <Route exact path="/authedProperty" component={Authed} />
      </Switch>
    </div>
  );
}

export default App;
