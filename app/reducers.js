/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import settingsPageReducer from 'containers/SettingsPage/reducer';

/**
 * Exports an object container the root reducer, router state, i18n and injected reducers
 * @param {object} injectedReducers Dynamically loaded reducers
 * @public
 * @return {object}
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    settings: settingsPageReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
