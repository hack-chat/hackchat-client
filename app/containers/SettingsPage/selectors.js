import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Root domain selector for the SettingsPage container state
 */
const selectSettingsPageDomain = (state) => state.settingsPage || initialState;

/**
 * Default selector
 */
const makeSelectSettingsPage = () =>
  createSelector(selectSettingsPageDomain, (substate) => substate);

export default makeSelectSettingsPage;
export { selectSettingsPageDomain };
