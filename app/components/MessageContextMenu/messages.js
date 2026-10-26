/**
 * This contains all the text for the MessageContextMenu component
 */

import { defineMessages } from 'react-intl';

const scope = 'hcclient.components.MessageContextMenu';

export default defineMessages({
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit Message',
  },
  reply: {
    id: `${scope}.reply`,
    defaultMessage: 'Reply',
  },
});
