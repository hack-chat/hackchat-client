import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Root domain selector for the WalletLayer container state
 */
const selectWalletLayerDomain = (state) => state.walletLayer || initialState;

/**
 * Get installed ui wallets
 */
const makeSelectWallets = () =>
  createSelector(selectWalletLayerDomain, (substate) => substate.uiWallets);

/**
 * Get recent wallet transactions
 */
const makeSelectPayments = () =>
  createSelector(
    selectWalletLayerDomain,
    (substate) => substate.recentPayments,
  );

/**
 * Get recent wallet transactions
 */
const makeSelectConnectedTo = () =>
  createSelector(selectWalletLayerDomain, (substate) => substate.connectedTo);

/**
 * Get recent wallet transactions
 */
const makeSelectConnectedAccount = () =>
  createSelector(
    selectWalletLayerDomain,
    (substate) => substate.connectedAccount,
  );

/**
 * Get recent wallet transactions
 */
const makeSelectWaitingOnWallet = () =>
  createSelector(
    selectWalletLayerDomain,
    (substate) => substate.waitingOnWallet,
  );

/**
 * Get current auth obj
 */
const makeSelectAuthToken = () =>
  createSelector(selectWalletLayerDomain, (substate) => substate.authToken);

export default makeSelectWallets;
export {
  selectWalletLayerDomain,
  makeSelectWallets,
  makeSelectPayments,
  makeSelectConnectedTo,
  makeSelectConnectedAccount,
  makeSelectWaitingOnWallet,
  makeSelectAuthToken,
};
