/**
 * This contains all the text for the MainMenu component
 */

import { defineMessages } from 'react-intl';

const scope = 'hcclient.components.MainMenu';
const genScope = 'hcclient.generic';

export default defineMessages({
  language: {
    id: `${genScope}.language`,
    defaultMessage: 'Language',
  },
  leaveChannel: {
    id: `${genScope}.leaveChannel`,
    defaultMessage: 'Leave Channel',
  },

  connectWallet: {
    id: `${scope}.connectWallet`,
    defaultMessage: 'Connect Wallet',
  },
  copyUrl: {
    id: `${scope}.copyUrl`,
    defaultMessage: 'Copy Chat Link',
  },
  joinOrCreate: {
    id: `${scope}.joinOrCreate`,
    defaultMessage: 'Join or Create. . .',
  },
  pinMenu: {
    id: `${scope}.pinMenu`,
    defaultMessage: 'Pin Menu',
  },
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Settings',
  },
  usersCount: {
    id: `${scope}.usersCount`,
    defaultMessage: '{count, plural, one {# user} other {# users}}',
  },
});
