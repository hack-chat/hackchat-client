/**
 * CommunicationProvider reducer exports
 */

import { produce } from 'immer';
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
} from './constants';

export const initialState = {
  connected: false,
  channel: false,
  channels: {},
  meta: {
    channelCount: 0,
    userCount: 0,
    channels: [],
  },
  sessionReady: false,
  lastSession: false,
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
        break;
      case CONNECTED:
        draft.connected = true;
        break;
      case SESSION_READY:
        localStorage.setItem(SESSION_LS, JSON.stringify(action.data.token));
        draft.sessionReady = true;

        if (action.data.restored === true) {
          Object.keys(draft.channels).forEach((chanName) => {
            const channelMessages = draft.channels[chanName].messages;
            const lastMsg =
              channelMessages.length > 0
                ? channelMessages[channelMessages.length - 1]
                : null;

            if (
              lastMsg &&
              lastMsg.type === 'warn' &&
              lastMsg.data.id === 987654322
            ) {
              return;
            }

            channelMessages.push({
              type: 'warn',
              data: {
                id: 987654322,
              },
            });
          });
        }
        break;
      case PUB_CHANS:
        draft.meta.channels = action.list;
        break;
      case HACK_ATTEMPT:
        draft.channels[action.data.channel].messages.push({
          type: 'hackAttempt',
          data: {
            from: action.data.from,
            url: action.data.url,
          },
        });
        break;
      case JOINED_CHANNEL:
        if (typeof draft.channels[action.data.channel] === 'undefined') {
          draft.channels[action.data.channel] = {
            users: action.data.users,
            messages: [],
          };
        } else {
          draft.channels[action.data.channel].users = action.data.users;
        }
        break;
      case DEBUG:
        //
        break;
      case USER_JOINED:
        draft.channels[action.channel].users[action.user.userid] = action.user;
        draft.channels[action.channel].messages.push({
          type: 'join',
          data: {
            channel: action.channel,
            userid: action.user.userid,
          },
        });
        break;
      case USER_LEFT:
        draft.channels[action.channel].users[action.user.userid] = action.user;
        draft.channels[action.channel].messages.push({
          type: 'leave',
          data: {
            channel: action.channel,
            userid: action.user.userid,
          },
        });
        break;
      case USER_UPDATE:
        draft.channels[action.channel].users[action.user.userid] = action.user;
        break;
      case WARNING:
        if (action.data.channel && draft.channels[action.data.channel]) {
          draft.channels[action.data.channel].messages.push({
            type: 'warn',
            data: action.data,
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
        // @todo add captcha support
        break;
      case INFORMATION:
        if (action.data.channel && draft.channels[action.data.channel]) {
          draft.channels[action.data.channel].messages.push({
            type: 'info',
            data: action.data,
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
        draft.channels[action.data.channel].messages.push({
          type: 'emote',
          data: action.data,
        });
        break;
      case INVITE:
        draft.channels[action.data.channel].messages.push({
          type: 'invite',
          data: action.data,
        });
        break;
      case WHISPER:
        draft.channels[action.channel].messages.push({
          type: 'whisper',
          data: action.data,
        });
        break;
      case MESSAGE:
        draft.channels[action.data.channel].messages.push({
          type: 'chat',
          data: {
            userid: action.data.userid,
            name: action.data.name,
            content: action.data.content,
            id: action.data.id,
          },
        });
        break;
      case IGNORE_USER:
        if (draft.channels[action.channel].users[action.userid].blocked) {
          draft.channels[action.channel].users[action.userid].blocked = false;
          draft.channels[action.channel].messages.push({
            type: 'info',
            data: {
              // yes, this is lazy af
              text: `👁️ @${draft.channels[action.channel].users[action.userid].username}`,
            },
          });
        } else {
          draft.channels[action.channel].users[action.userid].blocked = true;
          draft.channels[action.channel].messages.push({
            type: 'info',
            data: {
              // yes, this is also lazy af
              text: `🚫 @${draft.channels[action.channel].users[action.userid].username}`,
            },
          });
        }
        break;
      case NEW_TX_REQUEST:
        draft.channels[action.channel].messages.push({
          type: 'tx_request',
          data: {
            tx: action.tx,
            tx_type: action.tx_type,
            from: action.from,
          },
        });
        break;
      case UPDATE_MSG: {
        const targetChannel = draft.channels[action.channel];
        if (!targetChannel) break;

        const targetMessage = targetChannel.messages.find(
          (msg) => msg.data && msg.data.id === action.customId,
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
        draft.channels[action.channel].messages = [];
        break;
      }
    }
  });

export default communicationProviderReducer;
