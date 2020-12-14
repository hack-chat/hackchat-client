/**
 * This contains all the text for the ChannelsModal component
 */

import { defineMessages } from 'react-intl';

export const scope = 'hcclient.components.ChannelsModal';

export default defineMessages({
  ChannelsModalTitle: {
    id: `${scope}.title`,
    defaultMessage: 'Your Channels',
  },

  cancelText: {
    id: 'hcclient.Generic.cancel.text',
    defaultMessage: 'Cancel',
  },

  emptyChannelsText: {
    id: `${scope}.emptyChannelsText`,
    defaultMessage: 'You have not joined any channels. . .',
  },

  joinNewText: {
    id: 'hcclient.components.MainMenu.joinBtn.toolTip',
    defaultMessage: 'Join New Channel',
  },
});
