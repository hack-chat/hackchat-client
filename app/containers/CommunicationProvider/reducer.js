/**
 * CommunicationProvider reducer exports
 */

import produce from 'immer';
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
  WARNING,
  GOT_CAPTCHA,
  INFORMATION,
  EMOTE,
  INVITE,
  WHISPER,
  MESSAGE,
  PUSH_NOTIF,
  CLEAR_NOTIFS,
} from './constants';

export const initialState = {
  connected: false,
  client: false,
  channel: false,
  channels: {},
  globalNotifs: [],
  meta: {
    channelCount: 0,
    userCount: 0,
    channels: {},
  },
};

/* eslint-disable default-case, no-param-reassign */
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
        draft.client.channel = action.channel;
        break;
      case START_JOIN:
        draft.channel = action.channel;
        break;

      case CONNECTED:
        draft.connected = true;
        draft.client = action.data.client;
        break;
      case SESSION_READY:
        draft.meta.channelCount = action.data.payload.channelCount;
        draft.meta.userCount = action.data.payload.userCount;
        draft.meta.channels = action.data.payload.publicChannels;
        break;
      case JOINED_CHANNEL:
        draft.channels[action.data.client.channel] = {
          users: Array.from(action.data.client.users),
          messages: [],
        };
        break;
      case DEBUG:
        // console.log(action.data.payload);
        break;
      case USER_JOINED:
        draft.channels[action.data.client.channel].users = Array.from(
          action.data.client.users,
        );
        draft.channels[action.data.client.channel].messages.push({
          type: 'join',
          data: action.data,
        });
        break;
      case USER_LEFT:
        draft.channels[action.data.client.channel].users = Array.from(
          action.data.client.users,
        );
        draft.channels[action.data.client.channel].messages.push({
          type: 'leave',
          data: action.data,
        });
        break;
      case WARNING:
        if (
          action.data.payload.channel === false ||
          typeof draft.channels[action.data.client.channel] === 'undefined'
        ) {
          draft.globalNotifs.push({
            type: 'warn',
            data: action.data,
          });
        } else {
          draft.channels[action.data.client.channel].messages.push({
            type: 'warn',
            data: action.data,
          });
        }
        break;
      case GOT_CAPTCHA:
        draft.channels[action.data.client.channel].messages.push({
          type: 'captcha',
          data: action.data,
        });
        break;
      case INFORMATION:
        if (
          action.data.payload.channel === false ||
          typeof draft.channels[action.data.client.channel] === 'undefined'
        ) {
          draft.globalNotifs.push({
            type: 'info',
            data: action.data,
          });
        } else {
          draft.channels[action.data.client.channel].messages.push({
            type: 'info',
            data: action.data,
          });
        }
        break;
      case EMOTE:
        draft.channels[action.data.client.channel].messages.push({
          type: 'emote',
          data: action.data,
        });
        break;
      case INVITE:
        draft.channels[action.data.client.channel].messages.push({
          type: 'invite',
          data: action.data,
        });
        break;
      case WHISPER:
        draft.channels[action.data.client.channel].messages.push({
          type: 'whisper',
          data: action.data,
        });
        break;
      case MESSAGE:
        draft.channels[action.data.client.channel].messages.push({
          type: 'chat',
          data: action.data,
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
    }
  });

export default communicationProviderReducer;
