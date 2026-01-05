/**
 * LanguageProvider action exports
 */

import {
  CHANGE_LOCALE,
  PREVLANG_LSLABEL,
  OPEN_LOCALE_MODAL,
  CLOSE_LOCALE_MODAL,
} from './constants';

export function changeLocale(languageLocale) {
  localStorage.setItem(PREVLANG_LSLABEL, JSON.stringify(languageLocale));

  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}

export function openLocaleModal() {
  return {
    type: OPEN_LOCALE_MODAL,
  };
}

export function closeLocaleModal() {
  return {
    type: CLOSE_LOCALE_MODAL,
  };
}
