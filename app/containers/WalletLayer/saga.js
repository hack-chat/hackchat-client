/**
 * WalletLayer sagas
 *
 * This saga manages wallet connections
 */

import { eventChannel } from 'redux-saga';
import {
  take,
  call,
  put,
  takeLatest,
  fork,
  apply,
  delay,
} from 'redux-saga/effects';
import bs58 from 'bs58';
import { getWallets } from '@wallet-standard/app';
import { StandardConnect, StandardDisconnect } from '@wallet-standard/features';
import {
  SolanaSignAndSendTransaction,
  SolanaSignMessage,
} from '@solana/wallet-standard-features';
import {
  Connection,
  Transaction,
  ComputeBudgetProgram,
  SystemProgram,
} from '@solana/web3.js';
import { SHOW_TOAST } from 'containers/ToastNotifier/constants';
import {
  ADD_WALLET,
  REMOVE_WALLET,
  CONNECT_WALLET,
  CONNECT_ACCOUNT,
  SET_ACCOUNT,
  DISCONNECT_WALLET,
  DO_TX,
  PAYMENT_SENT,
  CONNECT_SUCCESS,
  CONNECT_FAILURE,
  DISCONNECT_SUCCESS,
  SIGN_MESSAGE_REQUEST,
  SIGN_MESSAGE_SUCCESS,
  SIGN_MESSAGE_FAILURE,
  WALLETS_SETTLED,
  WAITING_ON_WALLET,
} from './constants';
import { setAuthToken } from './actions';
import messages from './messages';

const SOLANA_MAINNET_CHAIN = 'solana:mainnet';

if (!window.__WALLET_CACHE__) {
  window.__WALLET_CACHE__ = {
    liveWallets: new Map(),
    liveAccounts: [],
    activeWallet: null,
    activeAccount: null,
  };
}

const WALLET_CACHE = window.__WALLET_CACHE__;

const RPC_URL = `https://solana-rpc.parafi.tech`;
const connection = new Connection(RPC_URL, 'confirmed');

function* connectAccountSaga({ account }) {
  const { address } = account;
  const selectedAccount = WALLET_CACHE.liveAccounts.find(
    (acc) => acc.address === address,
  );

  if (selectedAccount) {
    WALLET_CACHE.activeAccount = selectedAccount;
    yield put({
      type: SET_ACCOUNT,
      account,
    });
  } else {
    yield put({
      type: SHOW_TOAST,
      payload: {
        message: messages.unknownError,
        type: 'error',
      },
    });
  }
}

function* performTransaction(action) {
  yield put({ type: WAITING_ON_WALLET, waiting: true });
  const { activeWallet, activeAccount } = WALLET_CACHE;
  const { encodedPayload } = action;

  if (
    !activeWallet ||
    !activeAccount ||
    !activeAccount.address ||
    !activeAccount.chains ||
    !activeAccount.chains.length
  ) {
    yield put({ type: WAITING_ON_WALLET, waiting: false });
    yield put({
      type: SHOW_TOAST,
      payload: {
        message: messages.unknownError,
        type: 'error',
      },
    });
    return;
  }

  const signAndSendTransactionFeature =
    activeWallet.features[SolanaSignAndSendTransaction];

  if (!signAndSendTransactionFeature) {
    yield put({ type: WAITING_ON_WALLET, waiting: false });
    yield put({
      type: SHOW_TOAST,
      payload: {
        message: messages.unsupportedWallet,
        type: 'error',
      },
    });
    return;
  }

  try {
    let transactionBytes = Uint8Array.from(atob(encodedPayload), (c) =>
      c.charCodeAt(0),
    );
    let transaction = Transaction.from(transactionBytes);
    let simulationSuccess = false;

    const fixedAccounts = new Set();
    const MAX_RETRIES = 5;
    let retries = 0;

    while (!simulationSuccess && retries < MAX_RETRIES) {
      // eslint-disable-next-line no-console
      console.log(`Simulating transaction (Attempt ${retries + 1})...`);
      const { value: simulationResult } = yield call(
        [connection, 'simulateTransaction'],
        transaction,
      );

      if (simulationResult.err) {
        const errorJson = simulationResult.err;
        const errorStr = JSON.stringify(errorJson);
        const logsStr = JSON.stringify(simulationResult.logs || []);

        // eslint-disable-next-line no-console
        console.error('--- SIMULATION FAILED ---');
        // eslint-disable-next-line no-console
        console.error('Error:', errorJson);

        if (errorStr.includes('InsufficientFundsForRent')) {
          // eslint-disable-next-line no-console
          console.log('Detected Rent Problem. Analyzing...');

          const rentExemptLamports = yield call(
            [connection, 'getMinimumBalanceForRentExemption'],
            0,
          );

          const accountIndex =
            errorJson.InsufficientFundsForRent?.account_index;

          if (typeof accountIndex === 'number') {
            const keys = transaction.compileMessage().accountKeys;
            const recipientPubkey = keys[accountIndex];
            const recipientAddress = recipientPubkey.toString();

            if (fixedAccounts.has(recipientAddress)) {
              throw new Error(
                `Transaction failed: Auto-fix for ${recipientAddress} did not resolve the issue.`,
              );
            }

            // eslint-disable-next-line no-console
            console.log(
              `Injecting rent top-up of ${rentExemptLamports} lamports for ${recipientAddress}`,
            );

            const rentInstruction = SystemProgram.transfer({
              fromPubkey: transaction.feePayer,
              toPubkey: recipientPubkey,
              lamports: rentExemptLamports,
            });

            let insertIndex = 0;
            for (let i = 0; i < transaction.instructions.length; i++) {
              if (
                transaction.instructions[i].programId.equals(
                  ComputeBudgetProgram.programId,
                )
              ) {
                insertIndex++;
              } else {
                break;
              }
            }

            transaction.instructions.splice(insertIndex, 0, rentInstruction);

            transactionBytes = transaction.serialize({
              requireAllSignatures: false,
              verifySignatures: false,
            });

            fixedAccounts.add(recipientAddress);
            retries++;
            continue;
          }
        }

        if (errorStr.includes('AccountNotFound')) {
          throw new Error(
            'Transaction failed: Wallet account not found (likely 0 SOL).',
          );
        } else if (logsStr.includes('insufficient lamports')) {
          throw new Error(
            'Transaction failed: Insufficient SOL to complete this transfer.',
          );
        } else if (errorStr.includes('BlockhashNotFound')) {
          throw new Error('Transaction failed: Blockhash expired. Try again.');
        } else if (errorStr.includes('InsufficientFundsForRent')) {
          throw new Error(
            'Transaction failed: Recipient account needs rent exemption (Auto-fix failed).',
          );
        } else {
          throw new Error(
            'Transaction simulation failed. Check console for logs.',
          );
        }
      }

      simulationSuccess = true;

      // eslint-disable-next-line no-console
      console.log('Simulation successful');
    }

    const [{ signature }] = yield apply(
      activeWallet,
      signAndSendTransactionFeature.signAndSendTransaction,
      [
        {
          transaction: transactionBytes,
          account: activeAccount,
          chain: activeAccount.chains[0],
        },
      ],
    );

    yield put({ type: PAYMENT_SENT, signature: bs58.encode(signature) });
    yield put({
      type: SHOW_TOAST,
      payload: {
        message: messages.tokenSent,
        type: 'success',
      },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Transaction failed:', err);
    yield put({
      type: SHOW_TOAST,
      payload: {
        message: err.message || messages.unknownError,
        type: 'error',
      },
    });
  } finally {
    yield put({ type: WAITING_ON_WALLET, waiting: false });
  }
}

function* connectWalletSaga(action) {
  yield put({ type: WAITING_ON_WALLET, waiting: true });
  const { name } = action;

  try {
    const liveWallet = WALLET_CACHE.liveWallets.get(name);

    if (!liveWallet) {
      yield put({
        type: SHOW_TOAST,
        payload: {
          message: messages.unknownError,
          type: 'error',
        },
      });
      yield put({ type: WAITING_ON_WALLET, waiting: false });
      return;
    }

    const connectFeature = liveWallet.features[StandardConnect];

    if (!connectFeature || typeof connectFeature.connect !== 'function') {
      // eslint-disable-next-line no-console
      console.error('The connect feature is invalid.', {
        features: liveWallet.features,
      });
      throw new Error('Wallet does not support the StandardConnect feature.');
    }

    const { accounts } = yield apply(liveWallet, connectFeature.connect, []);

    if (accounts && accounts.length > 0) {
      WALLET_CACHE.liveAccounts = accounts;
      WALLET_CACHE.activeWallet = liveWallet;
      yield put(setAuthToken(null));

      const serializableAccounts = accounts.map((acc) => ({
        address: acc.address,
        name,
      }));

      yield put({
        type: CONNECT_SUCCESS,
        wallet: {
          chains: liveWallet.chains || ['solana:mainnet'],
          accounts: serializableAccounts,
          name: liveWallet.name,
          icon: liveWallet.icon,
          version: liveWallet.version,
        },
      });
    } else {
      throw new Error('Connection approved, but no accounts were returned');
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('An error occurred during the connect process:', e);
    yield put({ type: WAITING_ON_WALLET, waiting: false });

    if (e.message === 'Connection rejected') {
      yield put({
        type: SHOW_TOAST,
        payload: {
          message: messages.connectionRejectedError,
          type: 'error',
        },
      });
    } else {
      yield put({ type: CONNECT_FAILURE, error: e.message });
    }
  }
}

function* disconnectWalletSaga() {
  const { activeWallet } = WALLET_CACHE;

  if (!activeWallet) {
    return;
  }

  try {
    const disconnectFeature = activeWallet.features[StandardDisconnect];
    if (disconnectFeature) {
      yield apply(activeWallet, disconnectFeature.disconnect, []);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('disconnect failed:', e);
  } finally {
    WALLET_CACHE.liveAccounts = [];
    WALLET_CACHE.activeWallet = null;
    WALLET_CACHE.activeAccount = null;

    yield put(setAuthToken(null));
    yield put({
      type: DISCONNECT_SUCCESS,
      wallet: {
        chains: activeWallet.chains,
        accounts: [],
        name: activeWallet.name,
        icon: activeWallet.icon,
        version: activeWallet.version,
      },
    });
    yield put({
      type: SHOW_TOAST,
      payload: {
        message: messages.disconnectedNotice,
        type: 'warn',
      },
    });
  }
}

function* signMessageSaga(action) {
  const { message } = action;
  const { activeWallet, activeAccount } = WALLET_CACHE;

  if (!activeWallet || !activeAccount) {
    return;
  }

  try {
    const signMessageFeature = activeWallet.features[SolanaSignMessage];
    if (!signMessageFeature) {
      throw new Error('Wallet does not support `solana:signMessage`');
    }

    const messageBytes = new TextEncoder().encode(message);
    const [signOutput] = yield apply(
      activeWallet,
      signMessageFeature.signMessage,
      [
        {
          message: messageBytes,
          account: activeAccount,
        },
      ],
    );

    const { signature: signatureBytes } = signOutput;
    const signature = bs58.encode(signatureBytes);

    yield put({
      type: SIGN_MESSAGE_SUCCESS,
      signature,
      signedMessage: message,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('signing error:', err);

    yield put({ type: DISCONNECT_WALLET, name: activeWallet.name });
    yield put({ type: SIGN_MESSAGE_FAILURE });
    yield put({ type: WAITING_ON_WALLET, waiting: false });

    if (
      err === 'Transaction cancelled' ||
      err.message === 'User rejected the request.'
    ) {
      yield put({
        type: SHOW_TOAST,
        payload: {
          message: messages.signRejectedError,
          type: 'error',
        },
      });
    } else {
      yield put({
        type: SHOW_TOAST,
        payload: {
          message: messages.unsupportedWallet,
          type: 'error',
        },
      });
    }
  }
}

function initWalletListenerChannel() {
  return eventChannel((emitter) => {
    const { on } = getWallets();
    const onRegister = (wallets) => {
      const walletsArray = Array.isArray(wallets) ? wallets : [wallets];

      for (const wallet of walletsArray) {
        const isSolanaWallet =
          wallet.chains && wallet.chains.includes(SOLANA_MAINNET_CHAIN);

        if (!isSolanaWallet) {
          continue;
        }

        WALLET_CACHE.liveWallets.set(wallet.name, wallet);
        emitter({
          type: ADD_WALLET,
          wallet: {
            chains: wallet.chains,
            name: wallet.name,
            icon: wallet.icon,
            version: wallet.version,
          },
        });
      }
    };
    const onUnregister = (wallets) => {
      const walletsArray = Array.isArray(wallets) ? wallets : [wallets];

      for (const wallet of walletsArray) {
        WALLET_CACHE.liveWallets.delete(wallet.name);
        emitter({ type: REMOVE_WALLET, wallet: { name: wallet.name } });
      }
    };
    const offRegister = on('register', onRegister);
    const offUnregister = on('unregister', onUnregister);
    return () => {
      offRegister();
      offUnregister();
    };
  });
}

function* discoverInitialWalletsSaga() {
  if (WALLET_CACHE.isInitialized) {
    const knownWallets = Array.from(WALLET_CACHE.liveWallets.values());
    const serializableWallets = knownWallets.map((wallet) => ({
      chains: wallet.chains,
      name: wallet.name,
      icon: wallet.icon,
      version: wallet.version,
      accounts: [],
      key: wallet.name,
    }));
    yield put({ type: WALLETS_SETTLED, wallets: serializableWallets });
    return;
  }

  try {
    const { get } = getWallets();
    const initialWallets = yield call(get);
    const serializableWallets = [];

    for (const wallet of initialWallets) {
      const isSolanaWallet =
        wallet.chains && wallet.chains.includes(SOLANA_MAINNET_CHAIN);

      if (!isSolanaWallet) {
        continue;
      }

      WALLET_CACHE.liveWallets.set(wallet.name, wallet);

      const serializableWallet = {
        chains: wallet.chains,
        name: wallet.name,
        icon: wallet.icon,
        version: wallet.version,
      };
      yield put({ type: ADD_WALLET, wallet: serializableWallet });
      serializableWallets.push({
        ...serializableWallet,
        accounts: [],
        key: wallet.name,
      });
    }

    // Wait for a brief moment to allow event listeners to catch up
    yield delay(500);

    const finalWallets = Array.from(WALLET_CACHE.liveWallets.values());
    const finalSerializableWallets = finalWallets.map((wallet) => ({
      chains: wallet.chains,
      name: wallet.name,
      icon: wallet.icon,
      version: wallet.version,
      accounts: [],
      key: wallet.name,
    }));
    yield put({ type: WALLETS_SETTLED, wallets: finalSerializableWallets });
    WALLET_CACHE.isInitialized = true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to discover initial wallets:', err);
  }
}

export default function* walletLayerSaga() {
  yield fork(discoverInitialWalletsSaga);
  const listenerChannel = yield call(initWalletListenerChannel);
  yield fork(function* () {
    while (true) {
      const action = yield take(listenerChannel);
      yield put(action);
    }
  });

  yield takeLatest(CONNECT_ACCOUNT, connectAccountSaga);
  yield takeLatest(CONNECT_WALLET, connectWalletSaga);
  yield takeLatest(DISCONNECT_WALLET, disconnectWalletSaga);
  yield takeLatest(DO_TX, performTransaction);
  yield takeLatest(SIGN_MESSAGE_REQUEST, signMessageSaga);
}
