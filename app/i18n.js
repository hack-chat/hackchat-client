/**
 * This is the engine that changes words into other words :D
 */

import * as arTranslationMessages from './translations/ar.json';
import * as bnTranslationMessages from './translations/bn.json';
import * as deTranslationMessages from './translations/de.json';
import * as elTranslationMessages from './translations/el.json';
import * as enTranslationMessages from './translations/en.json';
import * as esTranslationMessages from './translations/es.json';
import * as faTranslationMessages from './translations/fa.json';
import * as fiTranslationMessages from './translations/fi.json';
import * as frTranslationMessages from './translations/fr.json';
import * as hiTranslationMessages from './translations/hi.json';
import * as idTranslationMessages from './translations/id.json';
import * as itTranslationMessages from './translations/it.json';
import * as jaTranslationMessages from './translations/ja.json';
import * as lvTranslationMessages from './translations/lv.json';
import * as ptTranslationMessages from './translations/pt.json';
import * as ruTranslationMessages from './translations/ru.json';
import * as trTranslationMessages from './translations/tr.json';
import * as zhTranslationMessages from './translations/zh.json';
import * as cnTranslationMessages from './translations/cn.json';

export let DEFAULT_LOCALE = 'en';
if (navigator && navigator.language) {
  [DEFAULT_LOCALE] = navigator.language.split(/[-_]/);
}

// prettier-ignore
export const appLocales = [
  'ar',
  'bn',
  'de',
  'el',
  'en',
  'es',
  'fa',
  'fi',
  'fr',
  'hi',
  'id',
  'it',
  'ja',
  'lv',
  'pt',
  'ru',
  'tr',
  'zh',
  'cn',
];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

export const translationMessages = {
  ar: formatTranslationMessages('ar', arTranslationMessages),
  bn: formatTranslationMessages('bn', bnTranslationMessages),
  de: formatTranslationMessages('de', deTranslationMessages),
  el: formatTranslationMessages('el', elTranslationMessages),
  es: formatTranslationMessages('es', esTranslationMessages),
  fa: formatTranslationMessages('fa', faTranslationMessages),
  fi: formatTranslationMessages('fi', fiTranslationMessages),
  fr: formatTranslationMessages('fr', frTranslationMessages),
  hi: formatTranslationMessages('hi', hiTranslationMessages),
  id: formatTranslationMessages('id', idTranslationMessages),
  it: formatTranslationMessages('it', itTranslationMessages),
  ja: formatTranslationMessages('ja', jaTranslationMessages),
  lv: formatTranslationMessages('lv', lvTranslationMessages),
  pt: formatTranslationMessages('pt', ptTranslationMessages),
  ru: formatTranslationMessages('ru', ruTranslationMessages),
  tr: formatTranslationMessages('tr', trTranslationMessages),
  zh: formatTranslationMessages('zh', zhTranslationMessages),
  cn: formatTranslationMessages('cn', cnTranslationMessages),
};
