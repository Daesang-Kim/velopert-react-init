import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import LiveLayoutContainer from 'containers/Live';

const LiveRoutes = ({ match }) => (
  <Switch>
    <Route exact path={match.path} component={LiveLayoutContainer} />
    <Redirect path="/" to={match.path} />
  </Switch>
);

LiveRoutes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default LiveRoutes;
