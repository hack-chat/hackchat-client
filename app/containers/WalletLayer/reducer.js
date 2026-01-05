/**
 * WalletLayer reducer exports
 */

import { produce } from 'immer';
import {
  REMOVE_WALLET,
  PAYMENT_SENT,
  WALLETS_SETTLED,
  CONNECT_SUCCESS,
  DISCONNECT_SUCCESS,
  WAITING_ON_WALLET,
  SET_ACCOUNT,
  SET_AUTH_TOKEN,
} from './constants';

export const initialState = {
  connectedTo: false,
  connectedAccount: false,
  uiWallets: [],
  recentPayments: [],
  waitingOnWallet: false,
  authToken: null,
};

const walletLayerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case WAITING_ON_WALLET:
        draft.waitingOnWallet = action.waiting;
        break;
      case CONNECT_SUCCESS:
        draft.connectedTo = action.wallet;
        break;
      case DISCONNECT_SUCCESS:
        draft.connectedTo = false;
        draft.connectedAccount = false;
        break;
      case WALLETS_SETTLED:
        draft.uiWallets = action.wallets;
        break;
      case REMOVE_WALLET:
        // console.log('lost wallet', action.wallet);
        // draft.uiWallets
        break;
      case PAYMENT_SENT:
        draft.recentPayments.push(action.details);
        break;
      case SET_ACCOUNT:
        draft.connectedAccount = action.account;
        break;
      case SET_AUTH_TOKEN:
        draft.authToken = action.token;
        break;
    }
  });

export default walletLayerReducer;
