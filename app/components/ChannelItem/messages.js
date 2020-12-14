/**
 * This contains all the text for the ChannelItem component
 */

import { defineMessages } from 'react-intl';

export const scope = 'hcclient.components.ChannelItem';

export default defineMessages({
  leaveChannelLabel: {
    id: `${scope}.leaveChannelLabel`,
    defaultMessage: 'Leave Channel',
  },

  takeOwnershipLabel: {
    id: `${scope}.takeOwnershipLabel`,
    defaultMessage: 'Take Ownership',
  },
  copyInviteLabel: {
    id: `${scope}.copyInviteLabel`,
    defaultMessage: 'Copy Invite Link',
  },
  enableCaptchaLabel: {
    id: `${scope}.enableCaptchaLabel`,
    defaultMessage: 'Enable Captcha',
  },
  disableCaptchaLabel: {
    id: `${scope}.disableCaptchaLabel`,
    defaultMessage: 'Disable Captcha',
  },
  lockChannelLabel: {
    id: `${scope}.lockChannelLabel`,
    defaultMessage: 'Lock Channel',
  },
  unlockChannelLabel: {
    id: `${scope}.unlockChannelLabel`,
    defaultMessage: 'Unlock Channel',
  },
});
