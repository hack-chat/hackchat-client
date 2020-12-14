/**
 * CommunicationProvider saga consumes and emits events from/to
 * the hackchat-engine
 */

import { eventChannel } from 'redux-saga';
import { take, call, put, takeLatest } from 'redux-saga/effects';

import {
  CONNECTION_ERROR,
  CONNECTED,
  SESSION_READY,
  START_JOIN,
  ENABLE_CAPTCHA,
  DISABLE_CAPTCHA,
  LOCK_CHANNEL,
  UNLOCK_CHANNEL,
  INVITE_USER,
  WHISPER_USER,
  IGNORE_USER,
  KICK_USER,
  BAN_USER,
  MUTE_USER,
  UNMUTE_USER,
  SEND_CHAT,
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
} from './constants';

const { Client } = require('hackchat-engine');
const hcClient = new Client({
  isBot: false,
});

function initWebsocket() {
  return eventChannel((emitter) => {
    hcClient.on('error', (err) =>
      emitter({ type: CONNECTION_ERROR, data: err }),
    );

    hcClient.on('connected', (client) =>
      emitter({ type: CONNECTED, data: { client } }),
    );

    hcClient.on('session', (payload) =>
      emitter({ type: SESSION_READY, data: { payload } }),
    );

    hcClient.on('channelJoined', (payload) =>
      emitter({
        type: JOINED_CHANNEL,
        data: {
          client: hcClient,
          payload,
        },
      }),
    );

    hcClient.on('debug', (payload) =>
      emitter({
        type: DEBUG,
        data: {
          client: hcClient,
          payload,
        },
      }),
    );

    hcClient.on('userJoined', (payload) =>
      emitter({
        type: USER_JOINED,
        data: {
          client: hcClient,
          payload,
        },
      }),
    );

    hcClient.on('userLeft', (payload) =>
      emitter({
        type: USER_LEFT,
        data: {
          client: hcClient,
          payload,
        },
      }),
    );

    hcClient.on('warning', (payload) =>
      emitter({
        type: WARNING,
        data: {
          client: hcClient,
          payload,
        },
      }),
    );

    hcClient.on('gotCaptcha', (payload) =>
      emitter({
        type: GOT_CAPTCHA,
        data: {
          client: hcClient,
          payload,
        },
      }),
    );

    hcClient.on('information', (payload) =>
      emitter({
        type: INFORMATION,
        data: {
          client: hcClient,
          payload,
        },
      }),
    );

    hcClient.on('emote', (payload) =>
      emitter({
        type: EMOTE,
        data: {
          client: hcClient,
          payload,
        },
      }),
    );

    hcClient.on('invite', (payload) =>
      emitter({
        type: INVITE,
        data: {
          client: hcClient,
          payload,
        },
      }),
    );

    hcClient.on('whisper', (payload) =>
      emitter({
        type: WHISPER,
        data: {
          client: hcClient,
          payload,
        },
      }),
    );

    hcClient.on('message', (payload) =>
      emitter({
        type: MESSAGE,
        data: {
          client: hcClient,
          payload: {
            userid: payload.user.userid,
            name: payload.user.name,
            content: payload.content,
          },
        },
      }),
    );

    // unsubscribe function
    return () => {
      // console.log('Socket off');
    };
  });
}

export default function* communicationProviderSaga() {
  const client = yield call(initWebsocket);

  // Channel Actions
  yield takeLatest(START_JOIN, (action) =>
    hcClient.join(action.username, action.password, action.channel),
  );

  yield takeLatest(SEND_CHAT, (action) =>
    hcClient.say(action.channel, action.message),
  );

  yield takeLatest(ENABLE_CAPTCHA, (action) =>
    hcClient.enableCaptcha(action.channel),
  );

  yield takeLatest(DISABLE_CAPTCHA, (action) =>
    hcClient.disableCaptcha(action.channel),
  );

  yield takeLatest(LOCK_CHANNEL, (action) =>
    hcClient.lockChannel(action.channel),
  );

  yield takeLatest(UNLOCK_CHANNEL, (action) =>
    hcClient.unlockChannel(action.channel),
  );

  // User Actions
  yield takeLatest(INVITE_USER, (action) =>
    action.user.sendInvite(action.channel),
  );

  yield takeLatest(WHISPER_USER, (action) =>
    hcClient.say(action.channel, 'I wish the developer wasnt so lazy. . .'),
  );

  yield takeLatest(IGNORE_USER, (action) => action.user.toggleBlock());

  yield takeLatest(KICK_USER, (action) => action.user.kick(action.channel));

  yield takeLatest(BAN_USER, (action) => action.user.ban(action.channel));

  yield takeLatest(MUTE_USER, (action) => action.user.mute(action.channel));

  yield takeLatest(UNMUTE_USER, (action) => action.user.unmute(action.channel));

  while (true) {
    const action = yield take(client);
    yield put(action);
  }
}
