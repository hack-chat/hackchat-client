/**
 * This contains all the text for the WalletLayer container
 */

import { defineMessages } from 'react-intl';

export const genScope = 'hcclient.general';
export const scope = 'hcclient.wallet';

export default defineMessages({
  connectionRejectedError: {
    id: `${scope}.connectionRejectedError`,
    defaultMessage: 'you canceled the connection',
  },
  unknownError: {
    id: `${scope}.unknownError`,
    defaultMessage: 'wallet unknown',
  },
  disconnectedNotice: {
    id: `${scope}.disconnectedNotice`,
    defaultMessage: 'wallet disconnected',
  },
  unsupportedWallet: {
    id: `${scope}.unsupportedWallet`,
    defaultMessage: 'this wallet is not supported',
  },
  signRejectedError: {
    id: `${scope}.signRejectedError`,
    defaultMessage: 'you canceled the sign in',
  },
  tokenSent: {
    id: `${scope}.tokenSent`,
    defaultMessage: 'transaction success!',
  },
  unsafeNotice: {
    id: `${scope}.unsafeNotice`,
    defaultMessage: 'unsafe transaction prevented',
  },
});
