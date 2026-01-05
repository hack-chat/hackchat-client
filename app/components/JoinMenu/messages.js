/**
 * This contains all the text for the JoinModal component
 */
import { defineMessages } from 'react-intl';

export const scope = 'hcclient.components.JoinMenu';
export const genScope = 'hcclient.Generic';

export default defineMessages({
  joinModalUsername: {
    id: `${scope}.username`,
    defaultMessage: 'username',
  },
  joinModalPassword: {
    id: `${scope}.password`,
    defaultMessage: 'password (optional)',
  },
  joinModalChannel: {
    id: `${scope}.channel`,
    defaultMessage: 'channel',
  },
  joinModalBtn: {
    id: `${scope}.button`,
    defaultMessage: 'Join!',
  },
  usernameColorText: {
    id: `${genScope}.usernameColor`,
    defaultMessage: 'Your Color',
  },
  rememberText: {
    id: `${genScope}.remember`,
    defaultMessage: 'Remember',
  },
  randomButtonText: {
    id: `${genScope}.randomButton`,
    defaultMessage: 'Use Random',
  },
});
