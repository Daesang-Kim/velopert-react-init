import {
  createAction,
  handleActions,
} from 'redux-actions';
import {
  Map,
} from 'immutable';

// action
export const GET_ATTRIBUTES = 'setup/GET_ATTRIBUTES';
const GET_ATTRIBUTES_SUCCESS = 'setup/GET_ATTRIBUTES_SUCCESS';
const GET_ATTRIBUTES_FAILURE = 'setup/GET_ATTRIBUTES_FAILURE';

// action create
export const getAttributes = createAction(GET_ATTRIBUTES);
export const getAttributeSuccess = createAction(GET_ATTRIBUTES_SUCCESS);
export const getAttributeFailure = createAction(GET_ATTRIBUTES_FAILURE);

const initialState = Map({
  attributeData: '',
});

// reducer
export default handleActions({
  [GET_ATTRIBUTES_SUCCESS]: (state, action) => state.set('attributeData', action.payload.attributeData),
  [GET_ATTRIBUTES_FAILURE]: (state, action) => state.set('attributeData', action.payload.attributeData),
}, initialState);
