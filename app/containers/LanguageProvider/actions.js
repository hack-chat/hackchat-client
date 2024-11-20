/**
 * LanguageProvider action exports
 */

import { CHANGE_LOCALE, PREVLANG_LSLABEL } from './constants';

export function changeLocale(languageLocale) {
  localStorage.setItem(PREVLANG_LSLABEL, JSON.stringify(languageLocale));

  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}
