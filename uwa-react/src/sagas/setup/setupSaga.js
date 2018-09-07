import {
  take,
  put,
  all,
} from 'redux-saga/effects';
import HttpRequest from 'util/lib/HttpRequest';
import * as setupAction from '../../modules/setup/setupModule';

function* asyncGetAttributes() {
  while (true) {
    yield take(setupAction.GET_ATTRIBUTES);

    console.log('setupAction.getAttr() - inner');
    try {
      const request = {
        url: '/stw-cgi/attributes.cgi',
      };
      const result = yield HttpRequest.get(request);

      yield put(setupAction.getAttributeSuccess({
        attributeData: result.data,
      }));
    } catch (error) {
      console.log('catch', error);
      yield put(setupAction.getAttributeFailure({
        attributeData: 'Error Data from saga',
      }));
    }
  }
}

export default function* rootLoginSaga() {
  yield all([
    asyncGetAttributes(),
  ]);
}
