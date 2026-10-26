/**
 * This contains all the text for the ChatManager component
 */

import { defineMessages } from 'react-intl';

const scope = 'hcclient.components.ChatManager';

export default defineMessages({
  aloneMsg: {
    id: `${scope}.aloneMsg`,
    defaultMessage: 'You are alone.',
  },
  currentChannel: {
    id: `${scope}.currentChannel`,
    defaultMessage: 'Current channel ',
  },
  onlineUsersText: {
    id: `${scope}.onlineUsersText`,
    defaultMessage: 'Online users:',
  },
});
