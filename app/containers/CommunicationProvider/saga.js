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
    hcClient.on('error', () => emitter({ type: CONNECTION_ERROR, data: {} }));

    hcClient.on('connected', () => emitter({ type: CONNECTED, data: {} }));

    hcClient.on('session', (payload) =>
      emitter({
        type: SESSION_READY,
        data: {
          channelCount: payload.channelCount,
          userCount: payload.userCount,
          publicChannels: payload.publicChannels,
        },
      }),
    );

    hcClient.on('channelJoined', (payload) => {
      let userList = {};
      hcClient.users.forEach((userRecord, key) => {
        userList[key] = {
          blocked: userRecord.blocked,
          bot: userRecord.bot,
          mine: userRecord.mine,
          nickColor: userRecord.nickColor,
          online: userRecord.online,
          permissionLevel: userRecord.permissionLevel,
          userchannel: userRecord.userchannel,
          userhash: userRecord.userhash,
          userid: userRecord.userid,
          userlevel: userRecord.userlevel,
          username: userRecord.username,
          usertrip: userRecord.usertrip,
        };
      });

      return emitter({
        type: JOINED_CHANNEL,
        data: {
          channel: payload.channel,
          users: userList,
        },
      });
    });

    /*hcClient.on('debug', (payload) =>
      emitter({
        type: DEBUG,
        data: {
          payload,
        },
      }),
    );*/

    hcClient.on('userJoined', (payload) =>
      emitter({
        type: USER_JOINED,
        channel: payload.channel,
        user: {
          blocked: payload.blocked,
          bot: payload.bot,
          mine: payload.mine,
          nickColor: payload.nickColor,
          online: payload.online,
          permissionLevel: payload.permissionLevel,
          userchannel: payload.userchannel,
          userhash: payload.userhash,
          userid: payload.userid,
          userlevel: payload.userlevel,
          username: payload.username,
          usertrip: payload.usertrip,
        },
      }),
    );

    hcClient.on('userLeft', (payload) =>
      emitter({
        type: USER_LEFT,
        channel: payload.channel,
        user: {
          blocked: payload.blocked,
          bot: payload.bot,
          mine: payload.mine,
          nickColor: payload.nickColor,
          online: payload.online,
          permissionLevel: payload.permissionLevel,
          userchannel: payload.userchannel,
          userhash: payload.userhash,
          userid: payload.userid,
          userlevel: payload.userlevel,
          username: payload.username,
          usertrip: payload.usertrip,
        },
      }),
    );

    hcClient.on('warning', (payload) =>
      emitter({
        type: WARNING,
        data: {
          channel: payload.channel,
          id: payload.id,
          text: payload.text,
        },
      }),
    );

    hcClient.on('gotCaptcha', (payload) =>
      emitter({
        type: GOT_CAPTCHA,
        data: {
          channel: payload.captchaData.channel,
          text: payload.captchaData.text,
        },
      }),
    );

    hcClient.on('information', (payload) =>
      emitter({
        type: INFORMATION,
        data: {
          channel: payload.channel,
          text: payload.text,
        },
      }),
    );

    hcClient.on('emote', (payload) =>
      emitter({
        type: EMOTE,
        data: {
          channel: payload.channel,
          content: payload.content,
        },
      }),
    );

    hcClient.on('invite', (payload) =>
      emitter({
        type: INVITE,
        data: {
          channel: payload.channel,
          targetChannel: payload.targetChannel,
          fromMe: payload.fromMe,
          to: {
            nickColor: payload.to.nickColor,
            userid: payload.to.userid,
            username: payload.to.username,
            usertrip: payload.to.usertrip,
          },
          from: {
            nickColor: payload.from.nickColor,
            userid: payload.from.userid,
            username: payload.from.username,
            usertrip: payload.from.usertrip,
          },
        },
      }),
    );

    hcClient.on('whisper', (payload) =>
      emitter({
        type: WHISPER,
        channel: payload.from.userchannel,
        data: {
          content: payload.content,
          from: {
            blocked: payload.from.blocked,
            bot: payload.from.bot,
            mine: payload.from.mine,
            nickColor: payload.from.nickColor,
            online: payload.from.online,
            permissionLevel: payload.from.permissionLevel,
            userchannel: payload.from.userchannel,
            userhash: payload.from.userhash,
            userid: payload.from.userid,
            userlevel: payload.from.userlevel,
            username: payload.from.username,
            usertrip: payload.from.usertrip,
          },
          fromMe: payload.fromMe,
          to: {
            blocked: payload.to.blocked,
            bot: payload.to.bot,
            mine: payload.to.mine,
            nickColor: payload.to.nickColor,
            online: payload.to.online,
            permissionLevel: payload.to.permissionLevel,
            userchannel: payload.to.userchannel,
            userhash: payload.to.userhash,
            userid: payload.to.userid,
            userlevel: payload.to.userlevel,
            username: payload.to.username,
            usertrip: payload.to.usertrip,
          },
        },
      }),
    );

    hcClient.on('message', (payload) =>
      emitter({
        type: MESSAGE,
        data: {
          channel: hcClient.channel || '',
          userid: payload.user.userid,
          name: payload.user.name,
          content: payload.content,
        },
      }),
    );

    // unsubscribe function
    return () => {
      //
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
  yield takeLatest(INVITE_USER, (action) => {
    const targetUser = hcClient.users.get(action.userid);
    if (targetUser) targetUser.sendInvite(action.channel);
  });

  yield takeLatest(WHISPER_USER, (action) =>
    // @todo
    hcClient.say(action.channel, 'I wish the developer wasnt so lazy. . .'),
  );

  yield takeLatest(IGNORE_USER, (action) => {
    const targetUser = hcClient.users.get(action.userid);
    if (targetUser) targetUser.toggleBlock();
  });

  yield takeLatest(KICK_USER, (action) => {
    const targetUser = hcClient.users.get(action.userid);
    if (targetUser) targetUser.kick(action.channel);
  });

  yield takeLatest(BAN_USER, (action) => {
    const targetUser = hcClient.users.get(action.userid);
    if (targetUser) targetUser.ban(action.channel);
  });

  yield takeLatest(MUTE_USER, (action) => {
    const targetUser = hcClient.users.get(action.userid);
    if (targetUser) targetUser.mute(action.channel);
  });

  yield takeLatest(UNMUTE_USER, (action) => {
    const targetUser = hcClient.users.get(action.userid);
    if (targetUser) targetUser.unmute(action.channel);
  });

  while (true) {
    const action = yield take(client);
    yield put(action);
  }
}
