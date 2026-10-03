/**
 * Communication provider actions tests
 */

import {
  changeChannel,
  joinChannel,
  leaveChannel,
  changeColor,
  sendChat,
  enableCaptcha,
  disableCaptcha,
  lockChannel,
  unlockChannel,
  inviteUser,
  ignoreUser,
  unignoreUser,
  kickUser,
  banUser,
  muteUser,
  unmuteUser,
  uwuifyUser,
  clearChannel,
  clearAuthReqs,
} from '../actions';
import {
  CHANGE_CHANNEL,
  START_JOIN,
  LEAVE_CHANNEL,
  CHANGE_COLOR,
  SEND_CHAT,
  ENABLE_CAPTCHA,
  DISABLE_CAPTCHA,
  LOCK_CHANNEL,
  UNLOCK_CHANNEL,
  INVITE_USER,
  IGNORE_USER,
  UNIGNORE_USER,
  KICK_USER,
  BAN_USER,
  MUTE_USER,
  UNMUTE_USER,
  UWUIFY_USER,
  CLEAR_CHANNEL,
  CLEAR_AUTH_REQS,
} from '../constants';

describe('CommunicationProvider actions', () => {
  it('changeChannel has a type of CHANGE_CHANNEL', () => {
    const expected = {
      type: CHANGE_CHANNEL,
      channel: 'x',
    };
    expect(changeChannel('x')).toEqual(expected);
  });

  it('joinChannel has a type of START_JOIN', () => {
    const expected = {
      type: START_JOIN,
      username: 'a',
      password: 'p',
      channel: 'x',
      color: '#fff',
    };
    expect(joinChannel('a', 'p', 'x', '#fff')).toEqual(expected);
  });

  it('leaveChannel has a type of LEAVE_CHANNEL', () => {
    const expected = {
      type: LEAVE_CHANNEL,
      channel: 'x',
    };
    expect(leaveChannel('x')).toEqual(expected);
  });

  it('changeColor has a type of CHANGE_COLOR', () => {
    const expected = {
      type: CHANGE_COLOR,
      color: '#000',
      channel: 'x',
    };
    expect(changeColor('#000', 'x')).toEqual(expected);
  });

  it('sendChat has a type of SEND_CHAT', () => {
    const expected = {
      type: SEND_CHAT,
      channel: 'x',
      message: 'hi',
    };
    expect(sendChat('x', 'hi')).toEqual(expected);
  });

  it('enableCaptcha has a type of ENABLE_CAPTCHA', () => {
    const expected = {
      type: ENABLE_CAPTCHA,
      channel: 'x',
    };
    expect(enableCaptcha('x')).toEqual(expected);
  });

  it('disableCaptcha has a type of DISABLE_CAPTCHA', () => {
    const expected = {
      type: DISABLE_CAPTCHA,
      channel: 'x',
    };
    expect(disableCaptcha('x')).toEqual(expected);
  });

  it('lockChannel has a type of LOCK_CHANNEL', () => {
    const expected = {
      type: LOCK_CHANNEL,
      channel: 'x',
    };
    expect(lockChannel('x')).toEqual(expected);
  });

  it('unlockChannel has a type of UNLOCK_CHANNEL', () => {
    const expected = {
      type: UNLOCK_CHANNEL,
      channel: 'x',
    };
    expect(unlockChannel('x')).toEqual(expected);
  });

  it('inviteUser has a type of INVITE_USER', () => {
    const expected = {
      type: INVITE_USER,
      channel: 'x',
      userid: 1,
    };
    expect(inviteUser('x', 1)).toEqual(expected);
  });

  it('ignoreUser has a type of IGNORE_USER', () => {
    const expected = {
      type: IGNORE_USER,
      channel: 'x',
      userid: 1,
    };
    expect(ignoreUser('x', 1)).toEqual(expected);
  });

  it('unignoreUser has a type of UNIGNORE_USER', () => {
    const expected = {
      type: UNIGNORE_USER,
      channel: 'x',
      userid: 1,
    };
    expect(unignoreUser('x', 1)).toEqual(expected);
  });

  it('kickUser has a type of KICK_USER', () => {
    const expected = {
      type: KICK_USER,
      channel: 'x',
      user: 1,
    };
    expect(kickUser('x', 1)).toEqual(expected);
  });

  it('banUser has a type of BAN_USER', () => {
    const expected = {
      type: BAN_USER,
      channel: 'x',
      user: 1,
    };
    expect(banUser('x', 1)).toEqual(expected);
  });

  it('muteUser has a type of MUTE_USER', () => {
    const expected = {
      type: MUTE_USER,
      channel: 'x',
      user: 1,
    };
    expect(muteUser('x', 1)).toEqual(expected);
  });

  it('unmuteUser has a type of UNMUTE_USER', () => {
    const expected = {
      type: UNMUTE_USER,
      channel: 'x',
      user: 1,
    };
    expect(unmuteUser('x', 1)).toEqual(expected);
  });

  it('uwuifyUser has a type of UWUIFY_USER', () => {
    const expected = {
      type: UWUIFY_USER,
      channel: 'x',
      user: 1,
    };
    expect(uwuifyUser('x', 1)).toEqual(expected);
  });

  it('clearChannel has a type of CLEAR_CHANNEL', () => {
    const expected = {
      type: CLEAR_CHANNEL,
      channel: 'x',
    };
    expect(clearChannel('x')).toEqual(expected);
  });

  it('clearAuthReqs has a type of CLEAR_AUTH_REQS', () => {
    const expected = {
      type: CLEAR_AUTH_REQS,
    };
    expect(clearAuthReqs()).toEqual(expected);
  });
});
