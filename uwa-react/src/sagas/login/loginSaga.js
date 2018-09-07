import {
  take,
  put,
  all,
} from 'redux-saga/effects';
import HttpRequest from 'util/lib/HttpRequest';
import Auth from 'util/lib/Authentication';
import * as loginAction from 'modules/login/loginModule';

const loginURL = '/stw-cgi/system.cgi?msubmenu=deviceinfo&action=view';

function* asyncLoginSaga() {
  while (true) {
    const action = yield take(loginAction.LOGIN);
    yield put(loginAction.loginPendding(true));
    try {
      const request = {
        url: loginURL,
        timeout: 2000,
      };
      yield HttpRequest.post(request);
    } catch (error) {
      const {
        history,
        userid,
        password,
      } = action.payload;
      console.log(error);
      if (typeof error.response === 'undefined') {
        Auth.loginFailed('Network error!');
      } else {
        const authData = {
          header: error.response.headers,
          userid,
          password,
        };
        Auth.makeAuthData(authData);
        try {
          const request = {
            url: loginURL,
          };
          yield HttpRequest.post(request);
          Auth.loginSuccess(history);
        } catch (failData) {
          Auth.loginFailed('ID and PW error!');
        }
      }
    }
  }
}

function* asyncGetAttributes() {
  while (true) {
    yield take(loginAction.GET_ATTRIBUTES);
    yield put(loginAction.loginPendding(true));
    console.log('loginAction.getAttr() - inner');
    try {
      const request = {
        url: '/stw-cgi/attributes.cgi',
      };
      const result = yield HttpRequest.get(request);
      yield put(loginAction.loginSuccess({
        pendding: false,
        isLogin: true,
        authData: result.data,
      }));
    } catch (error) {
      console.log('catch', error);
      yield put(loginAction.loginFailure({
        pendding: false,
        error: true,
        errorCode: error.response.status,
        isLogin: false,
      }));
    }
  }
}

function* asyncGetEventRules() {
  while (true) {
    yield take(loginAction.GET_EVENTRULES);
    try {
      const request = {
        url: '/stw-cgi/eventrules.cgi?msubmenu=rules&action=view',
        params: {
          EventSource: 'MotionDetection',
        },
      };
      const result = yield HttpRequest.get(request);
      console.log(result.data.EventRules[0]);
    } catch (error) {
      console.log('catch', error);
    }
  }
}

export default function* rootLoginSaga() {
  yield all([
    asyncLoginSaga(),
    asyncGetAttributes(),
    asyncGetEventRules(),
  ]);
}
