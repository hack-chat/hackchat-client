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
  PUSH_NOTIF,
  CLEAR_NOTIFS,
  PUB_CHANS,
  HACK_ATTEMPT,
  NEW_TX_REQUEST,
  UPDATE_MSG,
} from './constants';

export const initialState = {
  connected: false,
  channel: false,
  channels: {},
  globalNotifs: [],
  meta: {
    channelCount: 0,
    userCount: 0,
    channels: [],
  },
};

const communicationProviderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CONNECTION_ERROR:
        // prevent multiple connection notices
        if (draft.globalNotifs.length > 0) {
          if (
            draft.globalNotifs[draft.globalNotifs.length - 1].data.payload
              .id === 1
          ) {
            break;
          }
        }

        draft.globalNotifs.push({
          type: 'error',
          data: {
            payload: {
              err: action.data,
              text: '',
              id: 1,
            },
          },
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
        //
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
        draft.channels[action.data.channel] = {
          users: action.data.users,
          messages: [],
        };
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
        if (
          action.data.channel === false ||
          typeof draft.channels[action.data.channel] === 'undefined'
        ) {
          draft.globalNotifs.push({
            type: 'warn',
            data: action.data,
          });
        } else {
          draft.channels[action.data.channel].messages.push({
            type: 'warn',
            data: action.data,
          });
        }
        break;
      case GOT_CAPTCHA:
        draft.globalNotifs.push({
          type: 'captcha',
          data: action.data,
        });
        break;
      case INFORMATION:
        if (
          action.data.channel === false ||
          typeof draft.channels[action.data.channel] === 'undefined'
        ) {
          draft.globalNotifs.push({
            type: 'info',
            data: action.data,
          });
        } else {
          draft.channels[action.data.channel].messages.push({
            type: 'info',
            data: action.data,
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
      case PUSH_NOTIF:
        draft.globalNotifs.push({
          type: action.notifType,
          data: action.data,
        });
        break;
      case CLEAR_NOTIFS:
        draft.globalNotifs = [];
        break;
      case IGNORE_USER:
        if (draft.channels[action.channel].users[action.userid].blocked) {
          draft.channels[action.channel].users[action.userid].blocked = false;
          draft.globalNotifs.push({
            type: 'warn',
            data: {
              id: 1001,
              text: 'Ignored user',
            },
          });
        } else {
          draft.channels[action.channel].users[action.userid].blocked = true;
          draft.globalNotifs.push({
            type: 'warn',
            data: {
              id: 1002,
              text: 'Unignored user',
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
    }
  });

export default communicationProviderReducer;
