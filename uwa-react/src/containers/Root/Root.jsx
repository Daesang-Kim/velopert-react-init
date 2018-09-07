import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'modules';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'sagas/saga';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginLayoutContainer from 'containers/Login';
import PrivateRoute from 'routes/Common/PrivateRoute';
import MainRoutes from 'routes/MainRoutes';
import Auth from 'util/lib/Authentication';
import './Root.scss';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware),
);
Auth.setStore(store);

sagaMiddleware.run(rootSaga);

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginLayoutContainer} />
        <PrivateRoute component={MainRoutes} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Root;
