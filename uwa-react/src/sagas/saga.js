import {
  fork,
} from 'redux-saga/effects';
import rootLoginSaga from './login/loginSaga';
import setupSaga from './setup/setupSaga';

export default function* rootSaga() {
  yield fork(rootLoginSaga);
  yield fork(setupSaga);
}
