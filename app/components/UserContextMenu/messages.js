/**
 * This contains all the text for the UserContextMenu container
 */

import { defineMessages } from 'react-intl';

export const scope = 'hcclient.components.UserContextMenu';

const messages = {
  invite: {
    id: `${scope}.invite`,
    defaultMessage: 'Invite',
  },
  whisper: {
    id: `${scope}.whisper`,
    defaultMessage: 'Whisper',
  },
  kick: {
    id: `${scope}.kick`,
    defaultMessage: 'Kick',
  },
  ban: {
    id: `${scope}.ban`,
    defaultMessage: 'Ban',
  },
  mention: {
    id: `${scope}.mention`,
    defaultMessage: 'Mention',
  },
  ignore: {
    id: `${scope}.ignore`,
    defaultMessage: 'Ignore',
  },
  unignore: {
    id: `${scope}.unignore`,
    defaultMessage: 'Unignore',
  },
  setLevel: {
    id: `${scope}.setLevel`,
    defaultMessage: 'Set Level',
  },
  muzzle: {
    id: `${scope}.muzzle`,
    defaultMessage: 'Muzzle',
  },
  unmuzzle: {
    id: `${scope}.unmuzzle`,
    defaultMessage: 'Unmuzzle',
  },
  changeColor: {
    id: `${scope}.changeColor`,
    defaultMessage: 'Change Color',
  },
  changeFlair: {
    id: `${scope}.changeFlair`,
    defaultMessage: 'Change Flair',
  },
  uwuify: {
    id: `${scope}.uwuify`,
    defaultMessage: 'Uwuify',
  },
  manage: {
    id: `${scope}.manage`,
    defaultMessage: 'Manage',
  },
  send: {
    id: `${scope}.send`,
    defaultMessage: 'Send',
  },
  sendSolana: {
    id: `${scope}.sendSolana`,
    defaultMessage: 'Solana',
  },
  sendToken: {
    id: `${scope}.sendToken`,
    defaultMessage: 'Token',
  },
  sendNft: {
    id: `${scope}.sendNft`,
    defaultMessage: 'NFT',
  },
};

export default defineMessages(messages);
