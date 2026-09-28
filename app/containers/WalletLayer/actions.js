/**
 * WalletLayer action exports
 */

import {
  CONNECT_WALLET,
  CONNECT_ACCOUNT,
  DISCONNECT_WALLET,
  DO_TX,
  WAITING_ON_WALLET,
  SIGN_MESSAGE_REQUEST,
  SET_AUTH_TOKEN,
  SET_ACTIVE_ACCOUNT,
  SIGN_MESSAGE_SUCCESS,
  SIGN_MESSAGE_FAILURE,
  SET_PENDING_SIGN_REQUEST,
  CHECK_CHANNEL_INFO,
} from './constants';

/**
 * Connects to target wallet
 * @param  {number} name Wallet name
 * @return {object} An action object with a type of CONNECT_WALLET
 */
export function connectWallet(name) {
  return {
    type: CONNECT_WALLET,
    name,
  };
}

/**
 * Makes the selected account the active account
 * @param  {number} account account object
 * @return {object} An action object with a type of CONNECT_ACCOUNT
 */
export function setSelectedAccount(account) {
  return {
    type: CONNECT_ACCOUNT,
    account,
  };
}

/**
 * Disconnects from active wallet
 * @return {object} An action object with a type of DISCONNECT_WALLET
 */
export function disconnectWallet() {
  return {
    type: DISCONNECT_WALLET,
  };
}

/**
 * Sets the waiting flag to false
 * @return {object} An action object with a type of WAITING_ON_WALLET
 */
export function cancelWaiting() {
  return {
    type: WAITING_ON_WALLET,
    waiting: false,
  };
}

/**
 * Do a transaction
 * @param  {number} encodedPayload Encoded transaction chain
 * @return {object} An action object with a type of DO_TX
 */
export function doTransfer(encodedPayload) {
  return {
    type: DO_TX,
    encodedPayload,
  };
}

/**
 * Commit to signing message
 * @param {number} wallet Wallet id
 * @param {number} message Wallet account id
 * @return {object} An action object with a type of SIGN_MESSAGE_REQUEST
 */
export function signMessageRequest(wallet, message) {
  return {
    type: SIGN_MESSAGE_REQUEST,
    wallet,
    message,
  };
}

/**
 * Update the auth token in redux
 * @param {string} token JWT token
 * @return {object} An action object with a type of SET_AUTH_TOKEN
 */
export function setAuthToken(token) {
  return {
    type: SET_AUTH_TOKEN,
    token,
  };
}

/**
 * Update the auth token in redux
 * @param {number} account Account id
 * @return {object} An action object with a type of SET_ACTIVE_ACCOUNT
 */
export function setActiveAccount(account) {
  return {
    type: SET_ACTIVE_ACCOUNT,
    account,
  };
}

/**
 * Update the auth token in redux
 * @param {object} payload { signature, signedMessage }
 * @return {object} An action object with a type of SIGN_MESSAGE_SUCCESS
 */
export function signMessageSuccess({ signature, signedMessage }) {
  return {
    type: SIGN_MESSAGE_SUCCESS,
    signature,
    signedMessage,
  };
}

/**
 * Update the auth token in redux
 * @param {string} error Error message
 * @return {object} An action object with a type of SIGN_MESSAGE_FAILURE
 */
export function signMessageFailure(error) {
  return {
    type: SIGN_MESSAGE_FAILURE,
    error,
  };
}

/**
 * Store the sign request in redux so the UI can display a modal
 * @param {object} payload Incoming payload
 * @return {object} An action object with a type of SET_PENDING_SIGN_REQUEST
 */
export function setPendingSignRequest(payload) {
  return {
    type: SET_PENDING_SIGN_REQUEST,
    payload,
  };
}

/**
 * Request channel ownership and mods
 * @param {object} channel Target channel
 * @return {object} An action object with a type of CHECK_CHANNEL_INFO
 */
export function checkChannelInfo(channel) {
  return {
    type: CHECK_CHANNEL_INFO,
    channel,
  };
}
