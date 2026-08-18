/**
 * This contains all the text for the MessageContextMenu component
 */
import { defineMessages } from 'react-intl';

export const scope = 'hcclient.components.MessageContextMenu';

export default defineMessages({
  reply: {
    id: `${scope}.reply`,
    defaultMessage: 'Reply',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit Message',
  },
});
