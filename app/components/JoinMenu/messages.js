/**
 * This contains all the text for the JoinMenu component
 */

import { defineMessages } from 'react-intl';

const genScope = 'hcclient.generic';
const scope = 'hcclient.components.JoinMenu';

export default defineMessages({
  randomButtonText: {
    id: `${genScope}.randomButton`,
    defaultMessage: 'Use Random',
  },
  rememberText: {
    id: `${genScope}.remember`,
    defaultMessage: 'Remember',
  },
  usernameColorText: {
    id: `${genScope}.usernameColor`,
    defaultMessage: 'Your Color',
  },

  joinModalBtn: {
    id: `${scope}.button`,
    defaultMessage: 'Join!',
  },
  joinModalChannel: {
    id: `${scope}.channel`,
    defaultMessage: 'channel',
  },
  joinModalPassword: {
    id: `${scope}.password`,
    defaultMessage: 'password (optional)',
  },
  joinModalUsername: {
    id: `${scope}.username`,
    defaultMessage: 'username',
  },
  logoutTip: {
    id: `${scope}.logoutTip`,
    defaultMessage: 'Type "/logout" in chat to change your identity',
  },
  privacyLinkText: {
    id: `${scope}.privacyLinkText`,
    defaultMessage: 'Privacy Policy',
  },
  tosAgreement: {
    id: `${scope}.tosAgreement`,
    defaultMessage: 'I agree to the {tosLink} and {privacyLink}',
  },
  tosLinkText: {
    id: `${scope}.tosLinkText`,
    defaultMessage: 'Terms of Service',
  },
});
