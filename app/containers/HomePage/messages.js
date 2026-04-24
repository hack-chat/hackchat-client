/**
 * This contains all the text for the HomePage component
 */
import { defineMessages } from 'react-intl';

export const scope = 'hcclient.containers.HomePage';
export const genScope = 'hcclient.Generic';

export default defineMessages({
  tagline: {
    id: `${scope}.tagline`,
    defaultMessage:
      'Welcome to hack.chat, a minimal, distraction-free chat application.',
  },
  createOrJoinLabel: {
    id: `${scope}.createOrJoinLabel`,
    defaultMessage: 'Create or join a channel',
  },
  channelInfo: {
    id: `${scope}.channelInfo`,
    defaultMessage:
      'There are no channel lists, so a secret channel name can be used for private discussions.',
  },
  publicChannelsHeader: {
    id: `${scope}.publicChannelsHeader`,
    defaultMessage: 'Public Channels:',
  },
  formattingHeader: {
    id: `${scope}.formattingHeader`,
    defaultMessage: 'Formatting:',
  },
  formattingMd: {
    id: `${scope}.formattingMd`,
    defaultMessage:
      'This client includes a full Markdown engine, use ```fencing``` to preserve whitespace.',
  },
  formattingLatex: {
    id: `${scope}.formattingLatex`,
    defaultMessage: 'Surround LaTeX with a dollar sign for inline style.',
  },
  formattingCode: {
    id: `${scope}.formattingCode`,
    defaultMessage:
      'For syntax highlight, wrap the code like: ```[language] [the code]``` where [language] is any known programming language.',
  },
  currentGithub: {
    id: `${scope}.currentGithub`,
    defaultMessage: 'Current Github',
  },
  legacyGithub: {
    id: `${scope}.legacyGithub`,
    defaultMessage: 'Legacy GitHub',
  },
  thirdParty: {
    id: `${scope}.thirdParty`,
    defaultMessage:
      'Bots, Android clients, desktop clients, browser extensions, docker images, programming libraries, server modules and more',
  },
  legal: {
    id: `${scope}.legal`,
    defaultMessage:
      'Server and web client released under the WTFPL and MIT open source license. No message history is retained on the hack.chat server.',
  },
  siwText: {
    id: `${scope}.siwText`,
    defaultMessage:
      'The server is requesting wallet ownership verification, use the button below to complete the sign in process',
  },
  siwFinish: {
    id: `${scope}.siwFinish`,
    defaultMessage: 'Sign Message',
  },
  cancelText: {
    id: `${genScope}.cancel.text`,
    defaultMessage: 'Cancel',
  },
  understoodText: {
    id: `${scope}.understoodText`,
    defaultMessage: 'Understood',
  },
  externalLinkWarning: {
    id: `${scope}.externalLinkWarning`,
    defaultMessage:
      'You are about to visit an external link. This may compromise your security and privacy. Please be careful!',
  },
  suppressWarningText: {
    id: `${scope}.suppressWarningText`,
    defaultMessage: 'Dont show this again for this session',
  },
  txWarningHeader: {
    id: `${scope}.txWarningHeader`,
    defaultMessage: 'Third-Party Transaction Warning',
  },
  txWarningBody: {
    id: `${scope}.txWarningBody`,
    defaultMessage:
      'This transaction request was sent by a 3rd party. Please review the raw transaction data below before proceeding.',
  },
  txCopy: {
    id: `${scope}.txCopy`,
    defaultMessage: '[ copy ]',
  },
  txSignAndSend: {
    id: `${scope}.txSignAndSend`,
    defaultMessage: 'Sign & Send',
  },
});
