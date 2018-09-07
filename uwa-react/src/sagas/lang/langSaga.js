import {
  take,
  put,
} from 'redux-saga/effects';
import axios from 'axios';
import * as langAction from '../../modules/common/langModule';
import json from '../../util/language/English.json';

export default function* asyncLoginSaga() {
  while (true) {
    const action = yield take(langAction.SET_LANG);
    // console.log(action);
    try {
      const result = yield axios.get(action.payload.value);
      // console.log('Language Change Success: ', result);
      yield put(langAction.getLang(result.data));
      localStorage.setItem('language', JSON.stringify(action.payload));
    } catch (e) {
      // console.log('Language Change Failed: ', e);
      yield put(langAction.getLang(json));
    }
  }
}
