import {
  createAction,
  handleActions,
} from 'redux-actions';
import {
  Map,
} from 'immutable';

// action
export const LOGIN = 'login/LOGIN';
const LOGIN_PENDDING = 'login/LOGIN_PENDDING';
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'login/LOGIN_FAILURE';
const LOGOUT = 'login/LOGOUT';
export const LOGIN_AUTHENTICATE = 'login/LOGIN_AUTHENTICATE';
export const GET_ATTRIBUTES = 'login/GET_ATTRIBUTES';
export const GET_EVENTRULES = 'login/GET_EVENTRULES';

// action create
export const login = createAction(LOGIN);
export const loginPendding = createAction(LOGIN_PENDDING);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);
export const logout = createAction(LOGOUT);
export const loginAuthenticate = createAction(LOGIN_AUTHENTICATE);
export const getAttributes = createAction(GET_ATTRIBUTES);
export const getEventRules = createAction(GET_EVENTRULES);

const initialState = Map({
  pendding: false,
  error: false,
  errorStatus: '',
});

// reducer
export default handleActions({
  [LOGIN_PENDDING]: (state, action) => state.set('pendding', action.payload),
  [LOGIN_SUCCESS]: state => (
    state.set('pendding', false)
      .set('error', false)
      .set('errorStatus', '')
  ),
  [LOGIN_FAILURE]: (state, action) => {
    const {
      errorStatus,
    } = action.payload;

    return state.set('pendding', false)
      .set('error', true)
      .set('errorStatus', errorStatus);
  },
  [LOGOUT]: (state, action) => state.set('isLogin', action.payload),
}, initialState);
