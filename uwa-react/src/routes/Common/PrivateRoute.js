import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from 'util/lib/Authentication';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (Auth.isAuthenticated()
      ? <Component {...props} />
      : <Redirect to="/login" />
    )}
  />
);

export default PrivateRoute;
