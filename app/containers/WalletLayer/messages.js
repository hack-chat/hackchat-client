/**
 * This contains all the text for the WalletLayer container
 */

import { defineMessages } from 'react-intl';

const scope = 'hcclient.wallet';

export default defineMessages({
  connectionRejectedError: {
    id: `${scope}.connectionRejectedError`,
    defaultMessage: 'you canceled the connection',
  },
  disconnectedNotice: {
    id: `${scope}.disconnectedNotice`,
    defaultMessage: 'wallet disconnected',
  },
  signRejectedError: {
    id: `${scope}.signRejectedError`,
    defaultMessage: 'you canceled the sign in',
  },
  tokenSent: {
    id: `${scope}.tokenSent`,
    defaultMessage: 'transaction success!',
  },
  unknownError: {
    id: `${scope}.unknownError`,
    defaultMessage: 'wallet unknown',
  },
  unsupportedWallet: {
    id: `${scope}.unsupportedWallet`,
    defaultMessage: 'this wallet is not supported',
  },
});
