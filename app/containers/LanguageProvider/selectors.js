import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Root domain selector for the LanguageProvider container state
 */
const selectLanguage = (state) => state.language || initialState;

/**
 * Get the current language locale
 */
const makeSelectLocale = () =>
  createSelector(selectLanguage, (languageState) => languageState.locale);

export { selectLanguage, makeSelectLocale };
