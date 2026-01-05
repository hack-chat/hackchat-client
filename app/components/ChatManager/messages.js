/**
 * This contains all the text for the ChatManager component
 */
import { defineMessages } from 'react-intl';

export const scope = 'hcclient.components.ChatManager';

export default defineMessages({
  aloneMsg: {
    id: `${scope}.aloneMsg`,
    defaultMessage: 'You are alone.',
  },
  onlineUsersText: {
    id: `${scope}.onlineUsersText`,
    defaultMessage: 'Online users:',
  },
  currentChannel: {
    id: `${scope}.currentChannel`,
    defaultMessage: 'Current channel ',
  },
});
