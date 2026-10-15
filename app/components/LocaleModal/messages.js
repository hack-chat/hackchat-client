/**
 * This contains all the text for the LocaleModal component
 */

import { defineMessages } from 'react-intl';

export const scope = 'hcclient.components.LocaleModal';
export const genScope = 'hcclient.Generic';
export const langScope = 'hcclient.containers.LocaleToggle';

export default defineMessages({
  languageModalTitle: {
    id: `${scope}.title`,
    defaultMessage: 'Change Language',
  },
  cancelText: {
    id: `${genScope}.cancel.text`,
    defaultMessage: 'Cancel',
  },
  ar: {
    id: `${langScope}.ar`,
    defaultMessage: 'العربية',
  },
  bn: {
    id: `${langScope}.bn`,
    defaultMessage: 'বাংলা',
  },
  de: {
    id: `${langScope}.de`,
    defaultMessage: 'Deutsch',
  },
  el: {
    id: `${langScope}.el`,
    defaultMessage: 'ελληνικά',
  },
  en: {
    id: `${langScope}.en`,
    defaultMessage: 'English',
  },
  es: {
    id: `${langScope}.es`,
    defaultMessage: 'Español',
  },
  fa: {
    id: `${langScope}.fa`,
    defaultMessage: 'فارسی',
  },
  fi: {
    id: `${langScope}.fi`,
    defaultMessage: 'Suomi',
  },
  fr: {
    id: `${langScope}.fr`,
    defaultMessage: 'Français',
  },
  hi: {
    id: `${langScope}.hi`,
    defaultMessage: 'हिन्दी',
  },
  id: {
    id: `${langScope}.id`,
    defaultMessage: 'Bahasa Indonesia',
  },
  it: {
    id: `${langScope}.it`,
    defaultMessage: 'Italiano',
  },
  ja: {
    id: `${langScope}.ja`,
    defaultMessage: '日本語',
  },
  lv: {
    id: `${langScope}.lv`,
    defaultMessage: '1337 SP34K',
  },
  pt: {
    id: `${langScope}.pt`,
    defaultMessage: 'Português',
  },
  ru: {
    id: `${langScope}.ru`,
    defaultMessage: 'Русский язык',
  },
  tr: {
    id: `${langScope}.tr`,
    defaultMessage: 'Türkçe',
  },
  zh: {
    id: `${langScope}.zh`,
    defaultMessage: '繁体中文',
  },
  'zh-CN': {
    id: `${langScope}.zh-CN`,
    defaultMessage: '简体中文',
  },
});
