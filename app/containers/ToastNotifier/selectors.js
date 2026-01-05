import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Root domain selector for the ToastNotifier container state
 */
const selectToastDomain = (state) => state.toast || initialState;

/**
 * Get toast message
 */
const makeSelectToastMessage = () =>
  createSelector(selectToastDomain, (substate) => substate.message);

/**
 * Get toast type
 */
const makeSelectToastType = () =>
  createSelector(selectToastDomain, (substate) => substate.type);

/**
 * Get toast trigger
 */
const makeSelectToastTrigger = () =>
  createSelector(selectToastDomain, (substate) => substate.trigger);

export default makeSelectToastMessage;
export { makeSelectToastMessage, makeSelectToastType, makeSelectToastTrigger };
