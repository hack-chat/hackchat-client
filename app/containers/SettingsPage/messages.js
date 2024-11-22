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

  autoReconnectText: {
    id: `${scope}.autoReconnectText`,
    defaultMessage: 'Automatic Reconnect',
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
    id: 'hcclient.components.JoinModal.username',
    defaultMessage: 'username',
  },

  passwordText: {
    id: 'hcclient.components.JoinModal.password',
    defaultMessage: 'password',
  },

  usernameColorText: {
    id: 'hcclient.components.JoinModal.usernameColorText',
    defaultMessage: 'Your Color',
  },

  rememberText: {
    id: 'hcclient.components.JoinModal.rememberText',
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
});
