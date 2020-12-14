/**
 * ChannelItem exports the ui rendering functions that allow a user to interact with
 * their current channels
 */

import React from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { closeChannelsModal } from 'components/MainMenu/actions';
import {
  enableCaptcha,
  disableCaptcha,
  lockChannel,
  unlockChannel,
} from 'containers/CommunicationProvider/actions';
import { ButtonDropdown } from 'reactstrap';
import {
  SmallDropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'components/BaseModal';
import ChannelButton from './ChannelButton';
import LeaveChannelLabel from './LeaveChannelLabel';
import messages from './messages';

function ChannelItem({
  channel,
  onCloseChannelsModal,
  onEnableCaptcha,
  onDisableCaptcha,
  onLockChannel,
  onUnlockChannel,
  history,
  intl,
}) {
  const [dropdownOpen, setOpen] = useStateIfMounted(false);
  const toggle = () => setOpen(!dropdownOpen);

  const leaveChannelLabel = intl.formatMessage(messages.leaveChannelLabel);
  const copyInviteLabel = intl.formatMessage(messages.copyInviteLabel);
  const takeOwnershipLabel = intl.formatMessage(messages.takeOwnershipLabel);
  const enableCaptchaLabel = intl.formatMessage(messages.enableCaptchaLabel);
  const disableCaptchaLabel = intl.formatMessage(messages.disableCaptchaLabel);
  const lockChannelLabel = intl.formatMessage(messages.lockChannelLabel);
  const unlockChannelLabel = intl.formatMessage(messages.unlockChannelLabel);

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} key={`${channel}Btn`}>
      <ChannelButton
        id="caret"
        onClick={() => {
          onCloseChannelsModal();
          history.push(`/?${channel}`);
        }}
      >
        {channel}
      </ChannelButton>
      <SmallDropdownToggle caret />
      <DropdownMenu>
        <DropdownItem>
          <LeaveChannelLabel>{leaveChannelLabel}</LeaveChannelLabel>
        </DropdownItem>
        <DropdownItem disabled>{copyInviteLabel}</DropdownItem>
        <DropdownItem divider />
        <DropdownItem disabled>{takeOwnershipLabel}</DropdownItem>
        <DropdownItem
          onClick={() => {
            onCloseChannelsModal();
            onEnableCaptcha(channel);
          }}
        >
          {enableCaptchaLabel}
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            onCloseChannelsModal();
            onDisableCaptcha(channel);
          }}
        >
          {disableCaptchaLabel}
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            onCloseChannelsModal();
            onLockChannel(channel);
          }}
        >
          {lockChannelLabel}
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            onCloseChannelsModal();
            onUnlockChannel(channel);
          }}
        >
          {unlockChannelLabel}
        </DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
}

/*
  @todo Unofficial labels
  anticmd
*/

ChannelItem.propTypes = {
  channel: PropTypes.string,
  onCloseChannelsModal: PropTypes.func,
  onEnableCaptcha: PropTypes.func,
  onDisableCaptcha: PropTypes.func,
  onLockChannel: PropTypes.func,
  onUnlockChannel: PropTypes.func,
  history: PropTypes.object,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  // channelData: makeSelectChannelData(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCloseChannelsModal: () => dispatch(closeChannelsModal()),
    onEnableCaptcha: (channel) => dispatch(enableCaptcha(channel)),
    onDisableCaptcha: (channel) => dispatch(disableCaptcha(channel)),
    onLockChannel: (channel) => dispatch(lockChannel(channel)),
    onUnlockChannel: (channel) => dispatch(unlockChannel(channel)),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter, injectIntl)(ChannelItem);
