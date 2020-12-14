/**
 * This contains all the text for the StartScreen component
 */
import { defineMessages } from 'react-intl';

export const scope = 'hcclient.components.StartScreen';

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
    defaultMessage: 'Current Github:',
  },
  legacyGithub: {
    id: `${scope}.legacyGithub`,
    defaultMessage: 'Legacy GitHub:',
  },
  thirdParty: {
    id: `${scope}.thirdParty`,
    defaultMessage:
      'Bots, Android clients, desktop clients, browser extensions, docker images, programming libraries, server modules and more:',
  },
  legal: {
    id: `${scope}.legal`,
    defaultMessage:
      'Server and web client released under the WTFPL and MIT open source license. No message history is retained on the hack.chat server.',
  },
});
