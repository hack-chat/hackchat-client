/**
 * This contains all the text for the Notifier component
 */

import { defineMessages } from 'react-intl';

export const scope = 'hclient.Generic.Errors';

const messages = {
  globalConnection: {
    id: `${scope}.global.connection`,
    defaultMessage: 'Unable to connect to server. . .',
  },

  globalRateLimit: {
    id: `${scope}.global.rateLimit`,
    defaultMessage:
      'You are sending too much text. Wait a moment and try again. Press the up arrow key to restore your last message.',
  },
  globalUnknownUser: {
    id: `${scope}.global.unknownUser`,
    defaultMessage: 'Could not find user in that channel.',
  },
  globalPermsFail: {
    id: `${scope}.global.permsFail`,
    defaultMessage: 'You do not have permission to do this.',
  },

  joinRateLimit: {
    id: `${scope}.join.rateLimit`,
    defaultMessage:
      'You are joining channels too fast. Wait a moment and try again.',
  },
  globalBadNick: {
    id: `${scope}.global.badNick`,
    defaultMessage:
      'Nickname must consist of up to 24 letters, numbers, and underscores.',
  },
  globalTaken: {
    id: `${scope}.global.taken`,
    defaultMessage: 'Nickname taken.',
  },

  inviteRateLimit: {
    id: `${scope}.invite.rateLimit`,
    defaultMessage:
      'You are sending invites too fast. Wait a moment before trying again.',
  },

  warningLabel: {
    id: `${scope}.global.warningLabel`,
    defaultMessage: 'Warning',
  },

  errorLabel: {
    id: `${scope}.global.ErrorLabel`,
    defaultMessage: 'Error',
  },

  captchaLabel: {
    id: `${scope}.global.captchaLabel`,
    defaultMessage: 'Captcha',
  },

  ignoredUser: {
    id: `${scope}.global.ignoredUser`,
    defaultMessage: 'Ignored user',
  },

  unignoredUser: {
    id: `${scope}.global.unignoredUser`,
    defaultMessage: 'Unignored user',
  },
};

export const ERROR_ID = [];
ERROR_ID[1] = messages.globalConnection;

ERROR_ID[11] = messages.globalRateLimit;
ERROR_ID[12] = messages.globalUnknownUser;
ERROR_ID[13] = messages.globalPermsFail;

ERROR_ID[21] = messages.joinRateLimit;
ERROR_ID[22] = messages.globalBadNick;
ERROR_ID[23] = messages.globalTaken; // @todo
ERROR_ID[24] = messages.globalTaken;

ERROR_ID[31] = messages.globalPermsFail; // @todo
ERROR_ID[32] = messages.globalPermsFail; // @todo

ERROR_ID[41] = messages.inviteRateLimit;

ERROR_ID[1001] = messages.ignoredUser;
ERROR_ID[1002] = messages.unignoredUser;

export default defineMessages(messages);
