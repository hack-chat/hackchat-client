/**
 * This contains all the text for the UserItem component
 */

import { defineMessages } from 'react-intl';

export const scope = 'hcclient.components.UserItem';

export default defineMessages({
  inviteLabel: {
    id: `${scope}.invite`,
    defaultMessage: 'Invite',
  },

  whisperLabel: {
    id: `${scope}.whisper`,
    defaultMessage: 'Whisper',
  },

  ignoreLabel: {
    id: `${scope}.ignore`,
    defaultMessage: 'Ignore',
  },

  unignoreLabel: {
    id: `${scope}.unignore`,
    defaultMessage: 'Unignore',
  },

  kickLabel: {
    id: `${scope}.kick`,
    defaultMessage: 'Kick',
  },

  banLabel: {
    id: `${scope}.ban`,
    defaultMessage: 'Ban',
  },

  muteLabel: {
    id: `${scope}.mute`,
    defaultMessage: 'Mute',
  },

  unmuteLabel: {
    id: `${scope}.unmute`,
    defaultMessage: 'Unmute',
  },
});
