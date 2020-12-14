/**
 * This is the engine that changes words into other words :D
 */

const arTranslationMessages = require('./translations/ar.json');
const bnTranslationMessages = require('./translations/bn.json');
const deTranslationMessages = require('./translations/de.json');
const elTranslationMessages = require('./translations/el.json');
const enTranslationMessages = require('./translations/en.json');
const esTranslationMessages = require('./translations/es.json');
const faTranslationMessages = require('./translations/fa.json');
const fiTranslationMessages = require('./translations/fi.json');
const frTranslationMessages = require('./translations/fr.json');
const hiTranslationMessages = require('./translations/hi.json');
const idTranslationMessages = require('./translations/id.json');
const itTranslationMessages = require('./translations/it.json');
const jaTranslationMessages = require('./translations/ja.json');
const lvTranslationMessages = require('./translations/lv.json');
const ptTranslationMessages = require('./translations/pt.json');
const ruTranslationMessages = require('./translations/ru.json');
const trTranslationMessages = require('./translations/tr.json');
const zhTranslationMessages = require('./translations/zh.json');

let DEFAULT_LOCALE = 'en';
if (navigator && navigator.language) {
  [DEFAULT_LOCALE] = navigator.language.split(/[-_]/);
}

// prettier-ignore
const appLocales = [
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

const translationMessages = {
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
};

exports.appLocales = appLocales;
exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
