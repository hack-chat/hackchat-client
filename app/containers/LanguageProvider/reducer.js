/**
 * LanguageProvider reducer exports
 */

import { produce } from 'immer';

import { CHANGE_LOCALE, PREVLANG_LSLABEL } from './constants';
import { DEFAULT_LOCALE } from '../../i18n';

export const initialState = {
  locale: JSON.parse(localStorage.getItem(PREVLANG_LSLABEL)) || DEFAULT_LOCALE,
};

const languageProviderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_LOCALE:
        draft.locale = action.locale;
        break;
    }
  });

export default languageProviderReducer;
