/**
 * This contains all the text for the HomePage container
 */

import { defineMessages } from 'react-intl';

const genScope = 'hcclient.generic';
const scope = 'hcclient.containers.HomePage';

export default defineMessages({
  cancelText: {
    id: `${genScope}.cancel`,
    defaultMessage: 'Cancel',
  },

  connectionSlowText: {
    id: `${scope}.connectionSlowText`,
    defaultMessage: 'Connecting is taking longer than usual. . .',
  },
  createOrJoinLabel: {
    id: `${scope}.createOrJoinLabel`,
    defaultMessage: 'Create or join a channel',
  },
  currentGithub: {
    id: `${scope}.currentGithub`,
    defaultMessage: 'Current Github',
  },
  externalLinkWarning: {
    id: `${scope}.externalLinkWarning`,
    defaultMessage:
      'You are about to visit an external link. This may compromise your security and privacy. Be careful!',
  },
  legacyGithub: {
    id: `${scope}.legacyGithub`,
    defaultMessage: 'Legacy GitHub',
  },
  publicChannelsHeader: {
    id: `${scope}.publicChannelsHeader`,
    defaultMessage: 'Public Channels:',
  },
  siwFinish: {
    id: `${scope}.siwFinish`,
    defaultMessage: 'Sign Message',
  },
  siwText: {
    id: `${scope}.siwText`,
    defaultMessage:
      'The server is requesting wallet ownership verification, use the button below to complete the sign in process',
  },
  suppressWarningText: {
    id: `${scope}.suppressWarningText`,
    defaultMessage: 'Dont show this again for this session',
  },
  thirdParty: {
    id: `${scope}.thirdParty`,
    defaultMessage:
      'Bots, Android clients, desktop clients, browser extensions, docker images, programming libraries, server modules and more',
  },
  txBreakdown: {
    id: `${scope}.txBreakdown`,
    defaultMessage: 'View Transaction Breakdown ({count} instructions)',
  },
  txCopy: {
    id: `${scope}.txCopy`,
    defaultMessage: '[ copy ]',
  },
  txSignAndSend: {
    id: `${scope}.txSignAndSend`,
    defaultMessage: 'Proceed',
  },
  txWarningBody: {
    id: `${scope}.txWarningBody`,
    defaultMessage: 'Review the transaction details below before signing',
  },
  txWarningHeader: {
    id: `${scope}.txWarningHeader`,
    defaultMessage: 'Authorize Request',
  },
  understoodText: {
    id: `${scope}.understoodText`,
    defaultMessage: 'Understood',
  },
});
