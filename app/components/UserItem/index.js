/**
 * UserItem exports the ui rendering functions to display the child elements
 * of the UsersModal popup
 */

import React from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { closeUsersModal } from 'components/MainMenu/actions';
import {
  inviteUser,
  whisperUser,
  ignoreUser,
  kickUser,
  banUser,
  muteUser,
  unmuteUser,
} from 'containers/CommunicationProvider/actions';
import { makeSelectChannel } from 'containers/CommunicationProvider/selectors';
import {
  Dropdown,
  WideDropdownMenu,
  WideDropdownItem,
  WideDropdownToggle,
} from 'components/BaseModal';
import messages from './messages';

function UserItem({
  channel,
  onInviteUser,
  onWhisperUser,
  onIgnoreUser,
  onKickUser,
  onBanUser,
  onMuteUser,
  onUnmuteUser,
  user,
  onCloseUsersModal,
  myLevel,
  intl,
}) {
  const [dropdownOpen, setDropdownOpen] = useStateIfMounted(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const inviteLabel = intl.formatMessage(messages.inviteLabel);
  const whisperLabel = intl.formatMessage(messages.whisperLabel);
  const ignoreLabel = intl.formatMessage(messages.ignoreLabel);
  const unignoreLabel = intl.formatMessage(messages.unignoreLabel);

  const kickLabel = intl.formatMessage(messages.kickLabel);
  const banLabel = intl.formatMessage(messages.banLabel);
  const muteLabel = intl.formatMessage(messages.muteLabel);
  const unmuteLabel = intl.formatMessage(messages.unmuteLabel);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <WideDropdownToggle caret>{user.username}</WideDropdownToggle>
      <WideDropdownMenu>
        <WideDropdownItem
          onClick={() => {
            onCloseUsersModal();
            onInviteUser(channel, user.userid);
          }}
        >
          {inviteLabel}
        </WideDropdownItem>
        <WideDropdownItem
          onClick={() => {
            onCloseUsersModal();
            onWhisperUser(channel, user.userid);
          }}
        >
          {whisperLabel}
        </WideDropdownItem>
        <WideDropdownItem
          onClick={() => {
            onCloseUsersModal();
            onIgnoreUser(channel, user.userid);
          }}
        >
          {user.blocked ? unignoreLabel : ignoreLabel}
        </WideDropdownItem>

        <WideDropdownItem
          divider
          className={myLevel === 'user' ? 'd-none' : ''}
        />

        <WideDropdownItem
          className={myLevel === 'user' ? 'd-none' : ''}
          onClick={() => {
            onCloseUsersModal();
            onKickUser(channel, user);
          }}
        >
          {kickLabel}
        </WideDropdownItem>
        <WideDropdownItem
          className={myLevel === 'user' ? 'd-none' : ''}
          onClick={() => {
            onCloseUsersModal();
            onBanUser(channel, user);
          }}
        >
          {banLabel}
        </WideDropdownItem>
        <WideDropdownItem
          className={myLevel === 'user' ? 'd-none' : ''}
          onClick={() => {
            onCloseUsersModal();
            onMuteUser(channel, user);
          }}
        >
          {muteLabel}
        </WideDropdownItem>
        <WideDropdownItem
          className={myLevel === 'user' ? 'd-none' : ''}
          onClick={() => {
            onCloseUsersModal();
            onUnmuteUser(channel, user);
          }}
        >
          {unmuteLabel}
        </WideDropdownItem>
      </WideDropdownMenu>
    </Dropdown>
  );
}

/*
  @todo Unofficial labels
  authtrip
  deauthtrip
  forcecolor
  moveuser (will be different)
  overflow
*/

UserItem.propTypes = {
  channel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onCloseUsersModal: PropTypes.func,
  onInviteUser: PropTypes.func,
  onWhisperUser: PropTypes.func,
  onIgnoreUser: PropTypes.func,
  onKickUser: PropTypes.func,
  onBanUser: PropTypes.func,
  onMuteUser: PropTypes.func,
  onUnmuteUser: PropTypes.func,
  user: PropTypes.object,
  myLevel: PropTypes.string,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  channel: makeSelectChannel(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCloseUsersModal: () => dispatch(closeUsersModal()),
    onInviteUser: (channel, user) => dispatch(inviteUser(channel, user)),
    onWhisperUser: (channel, userid) => dispatch(whisperUser(channel, userid)),
    onIgnoreUser: (channel, user) => dispatch(ignoreUser(channel, user)),
    onKickUser: (channel, userid) => dispatch(kickUser(channel, userid)),
    onBanUser: (channel, userid) => dispatch(banUser(channel, userid)),
    onMuteUser: (channel, userid) => dispatch(muteUser(channel, userid)),
    onUnmuteUser: (channel, userid) => dispatch(unmuteUser(channel, userid)),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(UserItem);
