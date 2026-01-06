import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Root domain selector for the MainMenu component state
 */
const selectMainMenuDomain = (state) => state.mainMenu || initialState;

/**
 * Main menu status
 */
const makeSelectMainMenuStatus = () =>
  createSelector(selectMainMenuDomain, (substate) => substate.mainMenuOpen);

/**
 * Locale menu status
 */
const makeSelectLocaleMenuStatus = () =>
  createSelector(selectMainMenuDomain, (substate) => substate.localeModelOpen);

export {
  selectMainMenuDomain,
  makeSelectMainMenuStatus,
  makeSelectLocaleMenuStatus,
};
