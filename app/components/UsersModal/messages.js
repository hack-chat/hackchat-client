/**
 * This contains all the text for the UsersModal component
 */

import { defineMessages } from 'react-intl';

export const scope = 'hcclient.components.UsersModal';

export default defineMessages({
  usersModalTitle: {
    id: `${scope}.title`,
    defaultMessage: 'Online Users',
  },

  cancelText: {
    id: 'hcclient.Generic.cancel.text',
    defaultMessage: 'Cancel',
  },

  emptyChannelsText: {
    id: `hcclient.components.ChannelsModal.emptyChannelsText`,
    defaultMessage: 'You have not joined any channels. . .',
  },

  joinNewText: {
    id: 'hcclient.components.MainMenu.joinBtn.toolTip',
    defaultMessage: 'Join New Channel',
  },
});
