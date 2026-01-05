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

/**
 * Get the language modal open/closed state
 */
const makeSelectIsLocaleModalOpen = () =>
  createSelector(
    selectLanguage,
    (languageState) => languageState.isLocaleModalOpen,
  );

export { selectLanguage, makeSelectLocale, makeSelectIsLocaleModalOpen };
