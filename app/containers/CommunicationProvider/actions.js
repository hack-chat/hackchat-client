/**
 * CommunicationProvider action exports
 */

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
} from './constants';

/**
 * Alters the current channel the UI is displaying
 * @param  {string} channel New target channel name
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function changeChannel(channel) {
  return {
    type: CHANGE_CHANNEL,
    channel,
  };
}

/**
 * Informs the server of a new channel subscription
 * @param  {string} username Name to join with
 * @param  {string} password Password to join with
 * @param  {string} channel Target channel name
 * @return {object} An action object with a type of START_JOIN
 */
export function joinChannel(username, password, channel) {
  return {
    type: START_JOIN,
    username,
    password,
    channel,
  };
}

/**
 * Sends a `chat` command to the chat server
 * @param  {string} channel Channel to send `message` to
 * @param  {string} message `chat` text
 * @return {object} An action object with a type of SEND_CHAT
 */
export function sendChat(channel, message) {
  return {
    type: SEND_CHAT,
    channel,
    message,
  };
}

/**
 * Enable the captcha on target channel
 * @param  {string} channel Channel to enable captcha on
 * @return {object} An action object with a type of SEND_CHAT
 */
export function enableCaptcha(channel) {
  return {
    type: ENABLE_CAPTCHA,
    channel,
  };
}

/**
 * Disables the captcha on target channel
 * @param  {string} channel Channel to disable captcha on
 * @return {object} An action object with a type of DISABLE_CAPTCHA
 */
export function disableCaptcha(channel) {
  return {
    type: DISABLE_CAPTCHA,
    channel,
  };
}

/**
 * Lock the target channel
 * @param  {string} channel Channel to lock
 * @return {object} An action object with a type of LOCK_CHANNEL
 */
export function lockChannel(channel) {
  return {
    type: LOCK_CHANNEL,
    channel,
  };
}

/**
 * Unlock the target channel
 * @param  {string} channel Channel to unlock
 * @return {object} An action object with a type of UNLOCK_CHANNEL
 */
export function unlockChannel(channel) {
  return {
    type: UNLOCK_CHANNEL,
    channel,
  };
}

// User Actions

/**
 * Invite user to private channel
 * @param  {string} channel Channel to unlock
 * @param  {Object} user Target user to invite
 * @return {object} An action object with a type of INVITE_USER
 */
export function inviteUser(channel, user) {
  return {
    type: INVITE_USER,
    channel,
    user,
  };
}

/**
 * Prefill a whisper command for target user
 * @param  {string} channel Channel to unlock
 * @param  {number} user Target user to whisper
 * @return {object} An action object with a type of WHISPER_USER
 */
export function whisperUser(channel, user) {
  return {
    type: WHISPER_USER,
    channel,
    user,
  };
}

/**
 * Ignore target user
 * @param  {string} channel Channel to unlock
 * @param  {number} user Target user to ignore
 * @return {object} An action object with a type of IGNORE_USER
 */
export function ignoreUser(channel, user) {
  return {
    type: IGNORE_USER,
    channel,
    user,
  };
}

/**
 * Kick target user
 * @param  {string} channel Channel to unlock
 * @param  {number} user Target user to kick
 * @return {object} An action object with a type of KICK_USER
 */
export function kickUser(channel, user) {
  return {
    type: KICK_USER,
    channel,
    user,
  };
}

/**
 * Ban target user
 * @param  {string} channel Channel to unlock
 * @param  {number} user Target user to ban
 * @return {object} An action object with a type of BAN_USER
 */
export function banUser(channel, user) {
  return {
    type: BAN_USER,
    channel,
    user,
  };
}

/**
 * Mute target user
 * @param  {string} channel Channel to unlock
 * @param  {number} user Target user to mute
 * @return {object} An action object with a type of MUTE_USER
 */
export function muteUser(channel, user) {
  return {
    type: MUTE_USER,
    channel,
    user,
  };
}

/**
 * Unmute target user
 * @param  {string} channel Channel to unlock
 * @param  {number} user Target user to unmute
 * @return {object} An action object with a type of UNMUTE_USER
 */
export function unmuteUser(channel, user) {
  return {
    type: UNMUTE_USER,
    channel,
    user,
  };
}

/**
 * Clear all global notifications
 * @return {object} An action object with a type of CLEAR_NOTIFS
 */
export function pushNotif(notifType, data) {
  return {
    type: PUSH_NOTIF,
    notifType,
    data,
  };
}

/**
 * Clear all global notifications
 * @return {object} An action object with a type of CLEAR_NOTIFS
 */
export function clearNotifs() {
  return {
    type: CLEAR_NOTIFS,
  };
}
