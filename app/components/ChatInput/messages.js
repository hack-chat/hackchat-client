/**
 * This contains all the text for the ChatInput container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hcclient.components.ChatInput';

export default defineMessages({
  inputTitle: {
    id: `${scope}.inputTitle`,
    defaultMessage: 'Your Message',
  },
  reconnectingTitle: {
    id: `${scope}.reconnectingTitle`,
    defaultMessage: 'Reconnecting… your message will wait here',
  },
  previewTitle: {
    id: `${scope}.previewTitle`,
    defaultMessage: 'Preview Message',
  },
  sendTitle: {
    id: `${scope}.sendTitle`,
    defaultMessage: 'Send Message',
  },
});
