/**
 * This contains all the text for the MainMenu component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'hcclient.components.MainMenu';

export default defineMessages({
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Settings',
  },
  connectWallet: {
    id: `${scope}.connectWallet`,
    defaultMessage: 'Connect Wallet',
  },
  channels: {
    id: `${scope}.channels`,
    defaultMessage: 'Channels',
  },
  users: {
    id: `${scope}.users`,
    defaultMessage: 'Users',
  },
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
  currentChannel: {
    id: `${scope}.currentChannel`,
    defaultMessage: 'Current Channel',
  },
  usersCount: {
    id: `${scope}.usersCount`,
    defaultMessage: '{count, plural, one {# user} other {# users}}',
  },
  joinOrCreate: {
    id: `${scope}.joinOrCreate`,
    defaultMessage: 'Join or Create...',
  },
  language: {
    id: `${scope}.language`,
    defaultMessage: 'Language',
  },
  pinMenu: {
    id: `${scope}.pinMenu`,
    defaultMessage: 'Pin Menu',
  },
  mention: {
    id: `${scope}.mention`,
    defaultMessage: 'Mention',
  },
  ignore: {
    id: `${scope}.ignore`,
    defaultMessage: 'Ignore',
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
});
