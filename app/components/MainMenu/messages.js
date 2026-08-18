/**
 * This contains all the text for the MainMenu component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'hcclient.components.MainMenu';

export default defineMessages({
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Settings',
  },
  connectWallet: {
    id: `${scope}.connectWallet`,
    defaultMessage: 'Connect Wallet',
  },
  channels: {
    id: `${scope}.channels`,
    defaultMessage: 'Channels',
  },
  users: {
    id: `${scope}.users`,
    defaultMessage: 'Users',
  },
  currentChannel: {
    id: `${scope}.currentChannel`,
    defaultMessage: 'Current Channel',
  },
  usersCount: {
    id: `${scope}.usersCount`,
    defaultMessage: '{count, plural, one {# user} other {# users}}',
  },
  joinOrCreate: {
    id: `${scope}.joinOrCreate`,
    defaultMessage: 'Join or Create...',
  },
  language: {
    id: `${scope}.language`,
    defaultMessage: 'Language',
  },
  pinMenu: {
    id: `${scope}.pinMenu`,
    defaultMessage: 'Pin Menu',
  },
  copyUrl: {
    id: `${scope}.copyUrl`,
    defaultMessage: 'Copy Chat Link',
  },
  leaveChannel: {
    id: `${scope}.leaveChannel`,
    defaultMessage: 'Leave Channel',
  },
});
