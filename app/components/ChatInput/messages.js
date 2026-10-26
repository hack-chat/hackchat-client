/**
 * This contains all the text for the ChatInput component
 */

import { defineMessages } from 'react-intl';

const scope = 'hcclient.components.ChatInput';

export default defineMessages({
  inputTitle: {
    id: `${scope}.inputTitle`,
    defaultMessage: 'Your Message',
  },
  previewTitle: {
    id: `${scope}.previewTitle`,
    defaultMessage: 'Preview Message',
  },
  reconnectingTitle: {
    id: `${scope}.reconnectingTitle`,
    defaultMessage: 'Chat is reconnecting, one moment. . .',
  },
  sendTitle: {
    id: `${scope}.sendTitle`,
    defaultMessage: 'Send Message',
  },
});
