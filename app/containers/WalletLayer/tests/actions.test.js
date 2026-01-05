/**
 * WalletLayer
 */

import {
  changeChannel,
  joinChannel,
  sendChat,
  enableCaptcha,
  disableCaptcha,
  lockChannel,
  unlockChannel,
  inviteUser,
  whisperUser,
  ignoreUser,
  kickUser,
  banUser,
  muteUser,
  unmuteUser,
  pushNotif,
  clearNotifs,
} from '../actions';
import {
  CHANGE_CHANNEL,
  START_JOIN,
  SEND_CHAT,
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
  PUSH_NOTIF,
  CLEAR_NOTIFS,
} from '../constants';

describe('WalletLayer actions', () => {
  describe('Change current channel', () => {
    it('has a type of CHANGE_CHANNEL', () => {
      const expected = {
        type: CHANGE_CHANNEL,
      };
      expect(changeChannel()).toEqual(expected);
    });
  });

  describe('Initiate join', () => {
    it('has a type of START_JOIN', () => {
      const expected = {
        type: START_JOIN,
      };
      expect(joinChannel()).toEqual(expected);
    });
  });

  describe('Send channel message', () => {
    it('has a type of SEND_CHAT', () => {
      const expected = {
        type: SEND_CHAT,
      };
      expect(sendChat()).toEqual(expected);
    });
  });

  describe('Enabling captcha', () => {
    it('has a type of ENABLE_CAPTCHA', () => {
      const expected = {
        type: ENABLE_CAPTCHA,
      };
      expect(enableCaptcha()).toEqual(expected);
    });
  });

  describe('Disabling captcha', () => {
    it('has a type of DISABLE_CAPTCHA', () => {
      const expected = {
        type: DISABLE_CAPTCHA,
      };
      expect(disableCaptcha()).toEqual(expected);
    });
  });

  describe('Locking channel', () => {
    it('has a type of LOCK_CHANNEL', () => {
      const expected = {
        type: LOCK_CHANNEL,
      };
      expect(lockChannel()).toEqual(expected);
    });
  });

  describe('Unlocking channel', () => {
    it('has a type of UNLOCK_CHANNEL', () => {
      const expected = {
        type: UNLOCK_CHANNEL,
      };
      expect(unlockChannel()).toEqual(expected);
    });
  });

  describe('Inviting a user', () => {
    it('has a type of INVITE_USER', () => {
      const expected = {
        type: INVITE_USER,
      };
      expect(inviteUser()).toEqual(expected);
    });
  });

  describe('Whispering a user', () => {
    it('has a type of WHISPER_USER', () => {
      const expected = {
        type: WHISPER_USER,
      };
      expect(whisperUser()).toEqual(expected);
    });
  });

  describe('Ignoring a user', () => {
    it('has a type of IGNORE_USER', () => {
      const expected = {
        type: IGNORE_USER,
      };
      expect(ignoreUser()).toEqual(expected);
    });
  });

  describe('Kicking a user', () => {
    it('has a type of KICK_USER', () => {
      const expected = {
        type: KICK_USER,
      };
      expect(kickUser()).toEqual(expected);
    });
  });

  describe('Banning a user', () => {
    it('has a type of BAN_USER', () => {
      const expected = {
        type: BAN_USER,
      };
      expect(banUser()).toEqual(expected);
    });
  });

  describe('Muting a user', () => {
    it('has a type of MUTE_USER', () => {
      const expected = {
        type: MUTE_USER,
      };
      expect(muteUser()).toEqual(expected);
    });
  });

  describe('Unmuting a user', () => {
    it('has a type of UNMUTE_USER', () => {
      const expected = {
        type: UNMUTE_USER,
      };
      expect(unmuteUser()).toEqual(expected);
    });
  });

  describe('Adding a notification', () => {
    it('has a type of PUSH_NOTIF', () => {
      const expected = {
        type: PUSH_NOTIF,
      };
      expect(pushNotif()).toEqual(expected);
    });
  });

  describe('Clearning notifications', () => {
    it('has a type of CLEAR_NOTIFS', () => {
      const expected = {
        type: CLEAR_NOTIFS,
      };
      expect(clearNotifs()).toEqual(expected);
    });
  });
});
