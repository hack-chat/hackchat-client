/**
 * CommunicationProvider reducer exports
 */

import { produce } from 'immer';

import {
  SET_MAX_MESSAGES,
  MAX_MESSAGES_LSLABEL,
} from 'containers/SettingsPage/constants';

import {
  CONNECTION_ERROR,
  CHANGE_CHANNEL,
  START_JOIN,
  CONNECTED,
  SESSION_READY,
  JOINED_CHANNEL,
  DEBUG,
  USER_JOINED,
  USER_LEFT,
  USER_UPDATE,
  IGNORE_USER,
  UNIGNORE_USER,
  WARNING,
  GOT_CAPTCHA,
  INFORMATION,
  EMOTE,
  INVITE,
  WHISPER,
  MESSAGE,
  PUB_CHANS,
  HACK_ATTEMPT,
  NEW_TX_REQUEST,
  UPDATE_MSG,
  SESSION_LS,
  LEAVE_CHANNEL,
  CLEAR_CHANNEL,
  GOT_PASSWORD_REQ,
  CLEAR_AUTH_REQS,
  SET_AGREED_TOS,
  AGREED_TOS_LSLABEL,
  CURRENT_TOS_VERSION,
} from './constants';

const isMobile =
  typeof navigator !== 'undefined' &&
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

const getSenderId = (msg) => {
  if (msg.user?.userid) return msg.user.userid;
  if (msg.data?.from?.userid) return msg.data.from.userid;

  return msg.data?.userid;
};

const DEFAULT_MAX_MESSAGES = isMobile ? 500 : 3000;

const initialMaxMessagesStr = localStorage.getItem(MAX_MESSAGES_LSLABEL);
const initialMaxMessages =
  initialMaxMessagesStr !== null
    ? parseInt(initialMaxMessagesStr, 10)
    : DEFAULT_MAX_MESSAGES;

const savedTosVersion = JSON.parse(localStorage.getItem(AGREED_TOS_LSLABEL));
const initialHasAgreedTos = savedTosVersion === CURRENT_TOS_VERSION;

export const initialState = {
  connected: false,
  channel: false,
  pendingJoin: false,
  channels: Object.create(null),
  meta: {
    channelCount: 0,
    userCount: 0,
    channels: [],
  },
  sessionReady: false,
  lastSession: false,
  pendingCaptcha: false,
  pendingPasswordReq: false,
  maxMessages: initialMaxMessages,
  hasAgreedTos: initialHasAgreedTos,
};

const communicationProviderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CONNECTION_ERROR:
        draft.connected = false;
        draft.sessionReady = false;

        Object.keys(draft.channels).forEach((chanName) => {
          const channelMessages = draft.channels[chanName].messages;
          const lastMsg =
            channelMessages.length > 0
              ? channelMessages[channelMessages.length - 1]
              : null;

          if (
            lastMsg &&
            lastMsg.type === 'warn' &&
            lastMsg.data.id === 987654321
          ) {
            return;
          }

          channelMessages.push({
            type: 'warn',
            data: {
              id: 987654321,
            },
          });
        });
        break;
      case CHANGE_CHANNEL:
        draft.channel = action.channel;
        break;
      case START_JOIN:
        draft.channel = action.channel;
        if (typeof draft.channels[action.channel] === 'undefined') {
          draft.channels[action.channel] = {
            users: {},
            messages: [],
          };
        }
        break;
      case CONNECTED:
        draft.connected = true;
        break;
      case SESSION_READY:
        localStorage.setItem(SESSION_LS, JSON.stringify(action.data.token));
        draft.sessionReady = true;

        if (
          action.data.restored === true &&
          Array.isArray(action.data.channels)
        ) {
          const activeChannels = action.data.channels;

          Object.keys(draft.channels).forEach((chanName) => {
            if (!activeChannels.includes(chanName)) {
              delete draft.channels[chanName];
              return;
            }

            const channelMessages = draft.channels[chanName].messages;
            const lastMsg =
              channelMessages.length > 0
                ? channelMessages[channelMessages.length - 1]
                : null;

            if (
              lastMsg &&
              lastMsg.type === 'warn' &&
              lastMsg.data.isReconnectWarning
            ) {
              return;
            }

            channelMessages.push({
              type: 'warn',
              data: {
                id: 987654322,
                uniqueKey: `warn-${Date.now()}-${Math.random()}`,
                isReconnectWarning: true,
              },
            });
          });
        }
        break;
      case PUB_CHANS:
        draft.meta.channels = action.list;
        break;
      case HACK_ATTEMPT:
        if (!draft.channels[action.data.channel]) break;

        draft.channels[action.data.channel].messages.push({
          type: 'hackAttempt',
          data: {
            from: action.data.from,
            url: action.data.url,
          },
        });
        break;
      case JOINED_CHANNEL:
        draft.pendingCaptcha = false;
        draft.pendingPasswordReq = false;

        if (draft.pendingJoin === action.data.channel || !draft.channel) {
          draft.channel = action.data.channel;
          draft.pendingJoin = false;
        }

        if (typeof draft.channels[action.data.channel] === 'undefined') {
          draft.channels[action.data.channel] = {
            users: action.data.users,
            messages: [],
          };
        } else {
          const existingUsers = draft.channels[action.data.channel].users;
          const newUsers = action.data.users;

          Object.keys(existingUsers).forEach((userid) => {
            existingUsers[userid].online = false;
          });

          Object.keys(newUsers).forEach((userid) => {
            existingUsers[userid] = {
              ...existingUsers[userid],
              ...newUsers[userid],
              online: true,
            };
          });
        }
        break;
      case DEBUG:
        //
        break;
      case USER_JOINED:
        if (!draft.channels[action.channel]) break;

        draft.channels[action.channel].users[action.user.userid] = action.user;
        draft.channels[action.channel].messages.push({
          type: 'join',
          data: {
            channel: action.channel,
            userid: action.user.userid,
            time: Date.now(),
          },
        });
        break;
      case USER_LEFT:
        if (!draft.channels[action.channel]) break;

        if (draft.channels[action.channel].users[action.user.userid]) {
          draft.channels[action.channel].users[action.user.userid].online =
            false;
        }
        draft.channels[action.channel].messages.push({
          type: 'leave',
          data: {
            channel: action.channel,
            userid: action.user.userid,
            time: Date.now(),
          },
        });
        break;
      case USER_UPDATE:
        if (!draft.channels[action.channel]) break;

        draft.channels[action.channel].users[action.user.userid] = action.user;
        break;
      case WARNING:
        if (action.data.channel && draft.channels[action.data.channel]) {
          draft.channels[action.data.channel].messages.push({
            type: 'warn',
            data: { ...action.data, time: Date.now() },
          });
        } else {
          Object.keys(draft.channels).forEach((chanName) => {
            const channelMessages = draft.channels[chanName].messages;
            const lastMsg =
              channelMessages.length > 0
                ? channelMessages[channelMessages.length - 1]
                : null;

            if (
              lastMsg &&
              lastMsg.type === 'warn' &&
              lastMsg.data.text === action.data.text
            ) {
              return;
            }

            channelMessages.push({
              type: 'warn',
              data: action.data,
            });
          });
        }
        break;
      case GOT_CAPTCHA:
        draft.pendingCaptcha = {
          channel: action.data.channel,
          text: action.data.text,
        };
        break;
      case GOT_PASSWORD_REQ:
        draft.pendingPasswordReq = {
          channel: action.data.channel,
        };
        break;
      case INFORMATION:
        if (action.data.channel && draft.channels[action.data.channel]) {
          draft.channels[action.data.channel].messages.push({
            type: 'info',
            data: { ...action.data, time: Date.now() },
          });
        } else {
          Object.keys(draft.channels).forEach((chanName) => {
            const channelMessages = draft.channels[chanName].messages;
            const lastMsg =
              channelMessages.length > 0
                ? channelMessages[channelMessages.length - 1]
                : null;

            if (
              lastMsg &&
              lastMsg.type === 'info' &&
              lastMsg.data.text === action.data.text
            ) {
              return;
            }

            channelMessages.push({
              type: 'info',
              data: action.data,
            });
          });
        }
        break;
      case EMOTE:
        if (!draft.channels[action.data.channel]) break;

        draft.channels[action.data.channel].messages.push({
          type: 'emote',
          data: { ...action.data, time: Date.now() },
          user: action.user,
        });
        break;
      case INVITE:
        if (!draft.channels[action.data.channel]) break;

        draft.channels[action.data.channel].messages.push({
          type: 'invite',
          data: action.data,
        });
        break;
      case WHISPER:
        if (!draft.channels[action.channel]) break;

        draft.channels[action.channel].messages.push({
          type: 'whisper',
          data: { ...action.data, time: Date.now() },
        });
        break;
      case MESSAGE:
        if (!draft.channels[action.data.channel]) break;

        draft.channels[action.data.channel].messages.push({
          type: 'chat',
          data: {
            userid: action.data.userid,
            name: action.data.name,
            content: action.data.content,
            id: action.data.id,
            time: Date.now(),
          },
        });
        break;
      case IGNORE_USER: {
        if (!draft.channels[action.channel]) break;

        const toBlock = draft.channels[action.channel].users[action.userid];

        if (toBlock && !toBlock.blocked) {
          toBlock.blocked = true;

          Object.keys(draft.channels).forEach((chan) => {
            draft.channels[chan].messages = draft.channels[
              chan
            ].messages.filter((msg) => getSenderId(msg) !== action.userid);
          });

          draft.channels[action.channel].messages.push({
            type: 'info',
            data: {
              // yes, this is lazy af
              text: `🚫 @${toBlock.username}`,
            },
          });
        }
        break;
      }
      case UNIGNORE_USER: {
        if (!draft.channels[action.channel]) break;

        const toUnblock = draft.channels[action.channel].users[action.userid];

        if (toUnblock && toUnblock.blocked) {
          toUnblock.blocked = false;
          draft.channels[action.channel].messages.push({
            type: 'info',
            data: {
              // yes, this is also lazy af
              text: `👁️ @${toUnblock.username}`,
            },
          });
        }
        break;
      }
      case NEW_TX_REQUEST:
        if (!draft.channels[action.channel]) break;

        draft.channels[action.channel].messages.push({
          type: 'tx_request',
          data: {
            tx: action.tx,
            tx_type: action.tx_type,
            from: action.from,
            imageUrl: action.imageUrl,
            timestamp: Date.now(),
          },
        });
        break;
      case UPDATE_MSG: {
        const targetChannel = draft.channels[action.channel];
        if (!targetChannel) break;

        const targetMessage = [...targetChannel.messages]
          .reverse()
          .find(
            (msg) =>
              msg.data &&
              String(msg.data.id) === String(action.customId) &&
              msg.data.userid === action.userid,
          );

        if (targetMessage) {
          switch (action.mode) {
            case 'overwrite':
              targetMessage.data.content = action.text;
              break;
            case 'append':
              targetMessage.data.content += action.text;
              break;
            case 'prepend':
              targetMessage.data.content =
                action.text + targetMessage.data.content;
              break;
            default:
              break;
          }
        } else {
          // eslint-disable-next-line no-console
          console.log(
            `User ${action.userid} attempted to edit an invalid or unowned message.`,
          );
        }
        break;
      }
      case LEAVE_CHANNEL: {
        delete draft.channels[action.channel];

        if (draft.channel === action.channel) {
          const remainingChannels = Object.keys(draft.channels);
          draft.channel =
            remainingChannels.length > 0 ? remainingChannels[0] : false;
        }

        break;
      }
      case CLEAR_CHANNEL: {
        if (!draft.channels[action.channel]) break;

        draft.channels[action.channel].messages = [];
        break;
      }
      case CLEAR_AUTH_REQS:
        draft.pendingCaptcha = false;
        draft.pendingPasswordReq = false;
        break;
      case SET_MAX_MESSAGES:
        draft.maxMessages = action.maxMessages;
        break;
      case SET_AGREED_TOS:
        draft.hasAgreedTos = action.hasAgreedTos;
        break;
    }

    if (draft.maxMessages > 0) {
      Object.values(draft.channels).forEach((channelObj) => {
        if (
          channelObj.messages &&
          channelObj.messages.length > draft.maxMessages
        ) {
          channelObj.messages.splice(
            0,
            channelObj.messages.length - draft.maxMessages,
          );
        }
      });
    }
  });

export default communicationProviderReducer;
