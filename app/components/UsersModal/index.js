/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

/**
 * UsersModal exports the ui rendering functions to display the popup that allows
 * a user to interact with each channel user
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import { compose } from 'redux';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'components/BaseModal';

import {
  makeSelectChannel,
  makeSelectChannelData,
} from 'containers/CommunicationProvider/selectors';
import { closeUsersModal, openJoinModal } from 'components/MainMenu/actions';
import UserItem from 'components/UserItem';
import messages from './messages';

export function UsersModal({
  onCloseUsersModal,
  onOpenJoinModal,
  open,
  channel,
  channelData,
  intl,
}) {
  // @todo Move this object into `components/BaseModal`
  const closeBtn = (
    <button type="button" className="close" onClick={onCloseUsersModal}>
      &times;
    </button>
  );
  const usersModalTitle = intl.formatMessage(messages.usersModalTitle);
  const cancelText = intl.formatMessage(messages.cancelText);

  const emptyChannelsText = intl.formatMessage(messages.emptyChannelsText);
  const joinNewText = intl.formatMessage(messages.joinNewText);

  let userList = <div />;
  let noChannels = false;
  let myLevel = 'user';
  if (!channel) {
    noChannels = true;
    userList = <div key="empty">{emptyChannelsText}</div>;
  } else if (channelData[channel]) {
    channelData[channel].users.map((user) => {
      if (user[1].isMine) {
        myLevel = user[1].level;
      }
      return null;
    });
    userList = channelData[channel].users.map((user) => {
      if (!user[1].isMine && user[1].isOnline) {
        return (
          <UserItem
            channel={channel}
            user={user[1]}
            key={user[1].userid}
            myLevel={myLevel}
          />
        );
      }
      return null;
    });
  }

  return (
    <div>
      <Modal isOpen={open} toggle={onCloseUsersModal}>
        <ModalHeader toggle={onCloseUsersModal} close={closeBtn}>
          {usersModalTitle}
        </ModalHeader>
        <ModalBody>{userList}</ModalBody>
        <ModalFooter>
          <Button
            className={noChannels ? '' : 'd-none'}
            onClick={() => {
              onCloseUsersModal();
              onOpenJoinModal();
            }}
          >
            {joinNewText}
          </Button>{' '}
          <Button onClick={onCloseUsersModal}>{cancelText}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

UsersModal.propTypes = {
  onCloseUsersModal: PropTypes.func,
  onOpenJoinModal: PropTypes.func,
  open: PropTypes.bool,
  channel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  channelData: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  channel: makeSelectChannel(),
  channelData: makeSelectChannelData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onCloseUsersModal: () => dispatch(closeUsersModal()),
    onOpenJoinModal: () => dispatch(openJoinModal()),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(UsersModal);
