/**
 * This contains all the text for the SettingsPage container
 */

import { defineMessages } from 'react-intl';

const genScope = 'hcclient.generic';
const joinScope = 'hcclient.components.JoinMenu';
const scope = 'hcclient.containers.SettingsPage';

export default defineMessages({
  backBtnText: {
    id: `${genScope}.back`,
    defaultMessage: 'Back',
  },
  languageText: {
    id: `${genScope}.language`,
    defaultMessage: 'Language',
  },
  rememberText: {
    id: `${genScope}.remember`,
    defaultMessage: 'Remember',
  },
  usernameColorText: {
    id: `${genScope}.usernameColor`,
    defaultMessage: 'Your Color',
  },

  passwordText: {
    id: `${joinScope}.password`,
    defaultMessage: 'password',
  },
  usernameText: {
    id: `${joinScope}.username`,
    defaultMessage: 'username',
  },

  allowExtCodeText: {
    id: `${scope}.allowExtCodeText`,
    defaultMessage: 'Allow 3rd Party Code',
  },
  allowKatexText: {
    id: `${scope}.allowKatexText`,
    defaultMessage: 'Allow KaTeX',
  },
  allowMarkdownText: {
    id: `${scope}.allowMarkdownText`,
    defaultMessage: 'Allow Markdown',
  },
  appearanceNotificationsTitle: {
    id: `${scope}.appearanceNotificationsTitle`,
    defaultMessage: 'Appearance & Notifications',
  },
  channelsHistoryTitle: {
    id: `${scope}.channelsHistoryTitle`,
    defaultMessage: 'Channels & History',
  },
  clearHistoryText: {
    id: `${scope}.clearHistoryText`,
    defaultMessage: 'Clear History ( {count} Channels )',
  },
  currentThemeText: {
    id: `${scope}.currentThemeText`,
    defaultMessage: 'Current Theme: {themeName}',
  },
  doHighlightsText: {
    id: `${scope}.doHighlightsText`,
    defaultMessage: 'Highlight Mentions',
  },
  domainPlaceholder: {
    id: `${scope}.domainPlaceholder`,
    defaultMessage: 'Domain Name (e.g. google.com)',
  },
  enableNotificationsText: {
    id: `${scope}.enableNotificationsText`,
    defaultMessage: 'Enable Notifications',
  },
  enablePreviewText: {
    id: `${scope}.enablePreviewText`,
    defaultMessage: 'Show Preview Button',
  },
  formattingMediaTitle: {
    id: `${scope}.formattingMediaTitle`,
    defaultMessage: 'Formatting & Media',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Client Settings',
  },
  interfaceBehaviorTitle: {
    id: `${scope}.interfaceBehaviorTitle`,
    defaultMessage: 'Interface & Behavior',
  },
  largeModeText: {
    id: `${scope}.largeModeText`,
    defaultMessage: 'Large UI Mode',
  },
  manageDomainWhitelist: {
    id: `${scope}.manageDomainWhitelist`,
    defaultMessage: 'Manage Domain Whitelist',
  },
  maxMessagesText: {
    id: `${scope}.maxMessagesText`,
    defaultMessage: 'Max Messages (0 = infinite)',
  },
  menuPosText: {
    id: `${scope}.menuPosText`,
    defaultMessage: 'Leftside Menu Button',
  },
  showShortcodesText: {
    id: `${scope}.showShortcodesText`,
    defaultMessage: 'Show Shortcode Suggestions',
  },
  useLtrText: {
    id: `${scope}.useLtrText`,
    defaultMessage: 'Left to Right Reading',
  },
  wsPathText: {
    id: `${scope}.wsPathText`,
    defaultMessage: 'server path',
  },
});
