/*
 * This contains all the text for the WalletMenu component
 */

import { defineMessages } from 'react-intl';

const scope = 'hcclient.components.WalletMenu';

export default defineMessages({
  installWalletNotice: {
    id: `${scope}.installWalletNotice`,
    defaultMessage: 'You must install a Solana-compatible wallet',
  },
  noWalletsFound: {
    id: `${scope}.noWalletsFound`,
    defaultMessage: 'No wallets found',
  },
  selectAccountLabel: {
    id: `${scope}.selectAccountLabel`,
    defaultMessage: 'Select an Account',
  },
  signInWithLabel: {
    id: `${scope}.signInWithLabel`,
    defaultMessage: 'Sign in with',
  },
});
