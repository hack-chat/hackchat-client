/**
 * WalletMenu component handles wallet connection and account selection modals.
 */
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  connectWallet,
  setSelectedAccount,
} from 'containers/WalletLayer/actions';
import {
  makeSelectWallets,
  makeSelectConnectedTo,
  makeSelectWaitingOnWallet,
} from 'containers/WalletLayer/selectors';

import Modal from 'components/Modal';
import TinyLoadingIndicator from 'components/TinyLoadingIndicator';

import messages from './messages';

import WalletModalContainer from './WalletModalContainer';
import SectionTitle from './SectionTitle';
import ItemList from './ItemList';
import Item from './Item';
import WalletIcon from './WalletIcon';
import NoWalletsText from './NoWalletsText';

export function WalletMenu({
  intl,
  isOpen,
  doToggle,
  uiWallets,
  connectedAccount,
  isWaiting,
  onConnectWallet,
  onSetSelectedAccount,
}) {
  const [isAccountModalOpen, setAccountModalOpen] = useState(false);

  const signInWithLabel = intl.formatMessage(messages.signInWithLabel);
  const selectAccountLabel = intl.formatMessage(messages.selectAccountLabel);
  const noWalletsText = intl.formatMessage(messages.noWalletsFound);
  const installNotice = intl.formatMessage(messages.installWalletNotice);

  useEffect(() => {
    if (connectedAccount && connectedAccount.accounts.length > 0) {
      const { accounts } = connectedAccount;

      if (accounts.length === 1) {
        onSetSelectedAccount(accounts[0]);
        doToggle(false);
      } else if (accounts.length > 1) {
        doToggle(false);
        setAccountModalOpen(true);
      }
    }
  }, [connectedAccount, onSetSelectedAccount, doToggle]);

  const connectButtons = uiWallets.map((wallet, i) => {
    const isConnected =
      connectedAccount && connectedAccount.name === wallet.name;
    const isDisabled =
      (connectedAccount && connectedAccount.name !== wallet.name) || isWaiting;

    return (
      <Item
        key={i}
        className={isDisabled ? 'disabled' : ''}
        onClick={() => {
          if (!isConnected && !isDisabled) {
            onConnectWallet(wallet.name);
          }
        }}
      >
        {isWaiting && isConnected ? (
          <TinyLoadingIndicator />
        ) : (
          <WalletIcon src={wallet.icon} alt={`${wallet.name} icon`} />
        )}
        {wallet.name}
      </Item>
    );
  });

  let walletModalContents = connectButtons;
  if (walletModalContents.length === 0) {
    walletModalContents = (
      <NoWalletsText>
        {noWalletsText}
        <br />
        {installNotice}
      </NoWalletsText>
    );
  }

  return (
    <>
      <Modal isOpen={isOpen} doToggle={() => doToggle(false)}>
        <WalletModalContainer>
          <SectionTitle>{signInWithLabel}</SectionTitle>
          <ItemList>{walletModalContents}</ItemList>
        </WalletModalContainer>
      </Modal>

      <Modal
        isOpen={isAccountModalOpen}
        doToggle={() => setAccountModalOpen(false)}
      >
        <WalletModalContainer>
          <SectionTitle>{selectAccountLabel}</SectionTitle>
          <ItemList>
            {connectedAccount &&
              connectedAccount.accounts.map((account, index) => (
                <Item
                  key={index}
                  onClick={() => {
                    onSetSelectedAccount(account);
                    setAccountModalOpen(false);
                  }}
                >
                  {`${account.address.slice(0, 6)}...${account.address.slice(
                    -6,
                  )}`}
                </Item>
              ))}
          </ItemList>
        </WalletModalContainer>
      </Modal>
    </>
  );
}

WalletMenu.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  doToggle: PropTypes.func.isRequired,
  uiWallets: PropTypes.array,
  connectedAccount: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  isWaiting: PropTypes.bool,
  onConnectWallet: PropTypes.func,
  onSetSelectedAccount: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  uiWallets: makeSelectWallets(),
  connectedAccount: makeSelectConnectedTo(),
  isWaiting: makeSelectWaitingOnWallet(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onConnectWallet: (name) => dispatch(connectWallet(name)),
    onSetSelectedAccount: (account) => dispatch(setSelectedAccount(account)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl, memo)(WalletMenu);
