/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

/**
 * Exports an object container the root reducer, router state, i18n and injected reducers
 * @param {object} injectedReducers Dynamically loaded reducers
 * @public
 * @return {object}
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    language: languageProviderReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
