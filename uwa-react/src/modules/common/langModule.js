import {
  createAction,
  handleActions,
} from 'redux-actions';
import {
  Map,
} from 'immutable';

// action
export const SET_LANG = 'lang/SET_LANG';
export const GET_LANG = 'lang/GET_LANG';

// action create
export const setLang = createAction(SET_LANG);
export const getLang = createAction(GET_LANG);

const initialState = Map({
  currentLang: null,
  lang: {
    default: 'default',
  },
});

// reducer
export default handleActions({
  [SET_LANG]: (state, action) => state.set('currentLang', action.payload),
  [GET_LANG]: (state, action) => state.set('lang', action.payload),
}, initialState);
