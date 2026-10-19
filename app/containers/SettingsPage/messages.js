/**
 * This contains all the text for the SettingsPage container
 */

import { defineMessages } from 'react-intl';

export const scope = 'hcclient.containers.SettingsPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Client Settings',
  },
  clearHistoryText: {
    id: `${scope}.clearHistoryText`,
    defaultMessage: 'Clear History ( {count} Channels )',
  },
  currentThemeText: {
    id: `${scope}.currentThemeText`,
    defaultMessage: 'Current Theme: {themeName}',
  },
  allowKatexText: {
    id: `${scope}.allowKatexText`,
    defaultMessage: 'Allow KaTeX',
  },
  allowMarkdownText: {
    id: `${scope}.allowMarkdownText`,
    defaultMessage: 'Allow Markdown',
  },
  allowExtCodeText: {
    id: `${scope}.allowExtCodeText`,
    defaultMessage: 'Allow 3rd Party Code',
  },
  useLtrText: {
    id: `${scope}.useLtrText`,
    defaultMessage: 'Left to Right Reading',
  },
  menuPosText: {
    id: `${scope}.menuPosText`,
    defaultMessage: 'Leftside Menu Button',
  },
  doHighlightsText: {
    id: `${scope}.doHighlightsText`,
    defaultMessage: 'Highlight Mentions',
  },
  wsPathText: {
    id: `${scope}.wsPathText`,
    defaultMessage: 'server path',
  },
  reconnectText: {
    id: `${scope}.reconnectText`,
    defaultMessage: 'Reconnect Now',
  },
  usernameText: {
    id: 'hcclient.components.JoinMenu.username',
    defaultMessage: 'username',
  },
  passwordText: {
    id: 'hcclient.components.JoinMenu.password',
    defaultMessage: 'password',
  },
  usernameColorText: {
    id: 'hcclient.Generic.usernameColor',
    defaultMessage: 'Your Color',
  },
  rememberText: {
    id: 'hcclient.Generic.remember',
    defaultMessage: 'Remember',
  },
  languageText: {
    id: `hcclient.components.MainMenu.languageBtn.toolTip`,
    defaultMessage: 'Language',
  },
  backBtnText: {
    id: `hcclient.Generic.back.text`,
    defaultMessage: 'Back',
  },
  enableNotificationsText: {
    id: `${scope}.enableNotificationsText`,
    defaultMessage: 'Enable Notifications',
  },
  maxMessagesText: {
    id: `${scope}.maxMessagesText`,
    defaultMessage: 'Max Messages (0 = infinite)',
  },
  enablePreviewText: {
    id: `${scope}.enablePreviewText`,
    defaultMessage: 'Show Preview Button',
  },
  largeModeText: {
    id: `${scope}.largeModeText`,
    defaultMessage: 'Large UI Mode',
  },
  interfaceBehaviorTitle: {
    id: `${scope}.interfaceBehaviorTitle`,
    defaultMessage: 'Interface & Behavior',
  },
  formattingMediaTitle: {
    id: `${scope}.formattingMediaTitle`,
    defaultMessage: 'Formatting & Media',
  },
  appearanceNotificationsTitle: {
    id: `${scope}.appearanceNotificationsTitle`,
    defaultMessage: 'Appearance & Notifications',
  },
  channelsHistoryTitle: {
    id: `${scope}.channelsHistoryTitle`,
    defaultMessage: 'Channels & History',
  },
  manageDomainWhitelist: {
    id: `${scope}.manageDomainWhitelist`,
    defaultMessage: 'Manage Domain Whitelist',
  },
  domainPlaceholder: {
    id: `${scope}.domainPlaceholder`,
    defaultMessage: 'Domain Name (e.g. google.com)',
  },
  showShortcodesText: {
    id: `${scope}.showShortcodesText`,
    defaultMessage: 'Show Shortcode Suggestions',
  },
});
