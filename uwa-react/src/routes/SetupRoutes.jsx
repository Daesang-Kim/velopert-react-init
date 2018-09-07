import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import SetupLayoutContainer from 'containers/Setup';

const PlaybackRoutes = ({ match }) => {
  const baseURL = match.path;
  return (
    <Switch>
      <Route exact path={baseURL} component={SetupLayoutContainer} />
      <Redirect path="/" to={baseURL} />
    </Switch>
  );
};

PlaybackRoutes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default PlaybackRoutes;
