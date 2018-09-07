import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Root from './containers/Root';

const initAxios = () => {
  const baseURL = process.env.NODE_ENV !== 'production' ? 'http://192.168.124.108:80' : '';
  axios.defaults.baseURL = baseURL;
  axios.defaults.timeout = 5000;
};

initAxios();

ReactDOM.render(<Root />, document.getElementById('root'));
