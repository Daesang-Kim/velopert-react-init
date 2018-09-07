import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavigationBar from 'components/Common';
import LiveRoutes from './LiveRoutes';
import PlaybackRoutes from './PlaybackRoutes';
import SetupRoutes from './SetupRoutes';

const MainRoutes = () => (
  <div>
    <NavigationBar />
    <Switch>
      <Route path="/live" component={LiveRoutes} />
      <Route path="/playback" component={PlaybackRoutes} />
      <Route path="/setup" component={SetupRoutes} />
      <Redirect path="/" to="/live" />
    </Switch>
  </div>
);

export default MainRoutes;
