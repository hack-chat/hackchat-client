/**
 * CommunicationProvider saga consumes and emits events from/to
 * the hackchat-engine
 */

import { eventChannel } from 'redux-saga';
import { take, call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import { Client } from 'hackchat-engine';

import { SHOW_TOAST } from 'containers/ToastNotifier/constants';

import {
  CONNECTION_ERROR,
  CONNECTED,
  SESSION_READY,
  START_JOIN,
  CHANGE_COLOR,
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
  USER_JOINED,
  USER_LEFT,
  USER_UPDATE,
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
} from './constants';

import {
  SET_ACCOUNT,
  SIGN_MESSAGE_REQUEST,
  SIGN_MESSAGE_SUCCESS,
  SIGN_MESSAGE_FAILURE,
} from 'containers/WalletLayer/constants';

const hcClient = new Client({
  isBot: false,
});

window.hcClient = hcClient;

let waitingOnSIW = false;

function initWebsocket() {
  return eventChannel((emitter) => {
    const onError = () => emitter({ type: CONNECTION_ERROR, data: {} });

    const onConnected = () => {
      hcClient.ws.send({ cmd: 'getchannels' });
      return emitter({ type: CONNECTED, data: {} });
    };

    const onSession = (payload) =>
      emitter({
        type: SESSION_READY,
        data: {
          restored: payload.restored,
          token: payload.token,
          channels: payload.channels,
        },
      });

    const onChannelJoined = (payload) => {
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
          flair: userRecord.flair,
        };
      });

      return emitter({
        type: JOINED_CHANNEL,
        data: {
          channel: payload.channel,
          users: userList,
        },
      });
    };

    const onUserJoined = (payload) =>
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
          flair: payload.flair,
        },
      });

    const onUserLeft = (payload) =>
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
          flair: payload.flair,
        },
      });

    const onUserUpdate = (payload) =>
      emitter({
        type: USER_UPDATE,
        channel: payload.userchannel,
        userid: payload.userid,
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
          flair: payload.flair,
        },
      });

    const onWarning = (payload) =>
      emitter({
        type: WARNING,
        data: {
          channel: payload.channel,
          id: payload.id,
          text: payload.text,
        },
      });

    const onGotCaptcha = (payload) =>
      emitter({
        type: GOT_CAPTCHA,
        data: {
          channel: payload.captchaData.channel,
          text: payload.captchaData.text,
        },
      });

    const onInformation = (payload) =>
      emitter({
        type: INFORMATION,
        data: {
          channel: payload.channel,
          text: payload.text,
        },
      });

    const onEmote = (payload) =>
      emitter({
        type: EMOTE,
        data: {
          channel: payload.channel,
          content: payload.content,
        },
      });

    const onInvite = (payload) =>
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
      });

    const onWhisper = (payload) =>
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
            flair: payload.from.flair,
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
            flair: payload.to.flair,
          },
        },
      });

    const onMessage = (payload) =>
      emitter({
        type: MESSAGE,
        data: {
          channel: hcClient.channel || '',
          userid: payload.user.userid,
          name: payload.user.name,
          content: payload.content,
          id: payload.id || 0,
        },
      });

    const onPublicChannels = (payload) =>
      emitter({
        type: PUB_CHANS,
        list: payload.list,
      });

    const onHackAttempt = (payload) =>
      emitter({
        type: HACK_ATTEMPT,
        data: {
          channel: payload.channel,
          from: {
            nickColor: payload.from.nickColor,
            flair: payload.from.flair,
            userid: payload.from.userid,
            username: payload.from.username,
            usertrip: payload.from.usertrip,
          },
          url: payload.lib,
        },
      });

    const onSignMessage = (payload) =>
      emitter({
        type: SIGN_MESSAGE_REQUEST,
        wallet: payload.wallet,
        message: payload.message,
      });

    const onSignTransaction = (payload) =>
      emitter({
        type: NEW_TX_REQUEST,
        tx: payload.tx,
        tx_type: payload.type,
        channel: payload.channel,
        from: payload.from,
      });

    const onUpdateMessage = (payload) =>
      emitter({
        type: UPDATE_MSG,
        channel: payload.channel,
        customId: payload.customId,
        mode: payload.mode,
        text: payload.text,
        userid: payload.user.userid,
      });

    hcClient.on('error', onError);
    hcClient.on('connected', onConnected);
    hcClient.on('session', onSession);
    hcClient.on('channelJoined', onChannelJoined);
    hcClient.on('userJoined', onUserJoined);
    hcClient.on('userLeft', onUserLeft);
    hcClient.on('userUpdate', onUserUpdate);
    hcClient.on('warning', onWarning);
    hcClient.on('gotCaptcha', onGotCaptcha);
    hcClient.on('information', onInformation);
    hcClient.on('emote', onEmote);
    hcClient.on('invite', onInvite);
    hcClient.on('whisper', onWhisper);
    hcClient.on('message', onMessage);
    hcClient.on('publicchannels', onPublicChannels);
    hcClient.on('hackAttempt', onHackAttempt);
    hcClient.on('signMessage', onSignMessage);
    hcClient.on('signTransaction', onSignTransaction);
    hcClient.on('updateMessage', onUpdateMessage);

    return () => {
      hcClient.removeListener('error', onError);
      hcClient.removeListener('connected', onConnected);
      hcClient.removeListener('session', onSession);
      hcClient.removeListener('channelJoined', onChannelJoined);
      hcClient.removeListener('userJoined', onUserJoined);
      hcClient.removeListener('userLeft', onUserLeft);
      hcClient.removeListener('userUpdate', onUserUpdate);
      hcClient.removeListener('warning', onWarning);
      hcClient.removeListener('gotCaptcha', onGotCaptcha);
      hcClient.removeListener('information', onInformation);
      hcClient.removeListener('emote', onEmote);
      hcClient.removeListener('invite', onInvite);
      hcClient.removeListener('whisper', onWhisper);
      hcClient.removeListener('message', onMessage);
      hcClient.removeListener('publicchannels', onPublicChannels);
      hcClient.removeListener('hackAttempt', onHackAttempt);
      hcClient.removeListener('signMessage', onSignMessage);
      hcClient.removeListener('signTransaction', onSignTransaction);
      hcClient.removeListener('updateMessage', onUpdateMessage);
    };
  });
}

export default function* communicationProviderSaga() {
  const client = yield call(initWebsocket);

  // Channel Actions
  yield takeLatest(START_JOIN, (action) => {
    hcClient.color = action.color;
    hcClient.join(action.username, action.password, action.channel);
  });

  yield takeLatest(JOINED_CHANNEL, (action) =>
    hcClient.changeColor(hcClient.color, action.channel),
  );

  yield takeEvery(SEND_CHAT, (action) =>
    hcClient.say(action.channel, action.message),
  );

  yield takeLatest(CHANGE_COLOR, (action) =>
    hcClient.changeColor(action.color, action.channel),
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
    const targetUser = hcClient.users.get(action.user);
    if (targetUser) targetUser.kick(action.channel);
  });

  yield takeLatest(BAN_USER, (action) => {
    const targetUser = hcClient.users.get(action.user);
    if (targetUser) targetUser.ban(action.channel);
  });

  yield takeLatest(MUTE_USER, (action) => {
    const targetUser = hcClient.users.get(action.user);
    if (targetUser) targetUser.mute(action.channel);
  });

  yield takeLatest(UNMUTE_USER, (action) => {
    const targetUser = hcClient.users.get(action.user);
    if (targetUser) targetUser.unmute(action.channel);
  });

  yield takeLatest(SET_ACCOUNT, (action) => {
    waitingOnSIW = true;
    hcClient.requestSiw(action.account.name, action.account.address);
  });

  yield takeLatest(SIGN_MESSAGE_SUCCESS, (action) => {
    if (waitingOnSIW === false) return;

    waitingOnSIW = false;
    hcClient.sendSignature(action.signature, action.signedMessage);
  });

  yield takeLatest(SIGN_MESSAGE_FAILURE, () => {
    waitingOnSIW = false;
  });

  while (true) {
    const action = yield take(client);
    yield put(action);

    if (
      action.type === WARNING &&
      action.data &&
      action.data.channel === false
    ) {
      yield put({
        type: SHOW_TOAST,
        payload: {
          message: action.data.text,
          type: 'error',
        },
      });
    }
  }
}
