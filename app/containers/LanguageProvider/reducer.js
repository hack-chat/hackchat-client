/**
 * LanguageProvider reducer exports
 */

import { produce } from 'immer';

import {
  CHANGE_LOCALE,
  PREVLANG_LSLABEL,
  OPEN_LOCALE_MODAL,
  CLOSE_LOCALE_MODAL,
} from './constants';
import { DEFAULT_LOCALE } from '../../i18n';

export const initialState = {
  locale: JSON.parse(localStorage.getItem(PREVLANG_LSLABEL)) || DEFAULT_LOCALE,
  isLocaleModalOpen: false,
};

const languageProviderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_LOCALE:
        draft.locale = action.locale;
        break;
      case OPEN_LOCALE_MODAL:
        draft.isLocaleModalOpen = true;
        break;
      case CLOSE_LOCALE_MODAL:
        draft.isLocaleModalOpen = false;
        break;
    }
  });

export default languageProviderReducer;
