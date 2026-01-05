/*
 * WalletMenu Messages
 *
 * This contains all the text for the WalletMenu component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'hcclient.components.WalletMenu';

export default defineMessages({
  signInWithLabel: {
    id: `${scope}.signInWithLabel`,
    defaultMessage: 'Sign in with',
  },
  selectAccountLabel: {
    id: `${scope}.selectAccountLabel`,
    defaultMessage: 'Select an Account',
  },
  noWalletsFound: {
    id: `${scope}.noWalletsFound`,
    defaultMessage: 'No wallets found.',
  },
  installWalletNotice: {
    id: `${scope}.installWalletNotice`,
    defaultMessage: 'Please install a Solana-compatible wallet.',
  },
});
