import { combineReducers } from 'redux';

import langModule from './common/langModule';
import loginModule from './login/loginModule';
import setupModule from './setup/setupModule';

export default combineReducers({
  langModule,
  loginModule,
  setupModule,
});
