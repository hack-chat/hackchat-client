/**
 * ChannelsModal exports the ui rendering functions to display the popup allowing users
 * to interact with each `ChannelItem` child
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectChannelData } from 'containers/CommunicationProvider/selectors';

import { closeChannelsModal, openJoinModal } from 'components/MainMenu/actions';
import ChannelItem from 'components/ChannelItem';

import { ListGroup } from 'reactstrap';

import {
  CloseButton,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'components/BaseModal';

import messages from './messages';

export function ChannelsModal({
  onCloseChannelsModal,
  channelData,
  onOpenJoinModal,
  open,
  className,
  intl,
}) {
  const channelsModalTitle = intl.formatMessage(messages.ChannelsModalTitle);
  const cancelText = intl.formatMessage(messages.cancelText);
  const emptyChannelsText = intl.formatMessage(messages.emptyChannelsText);
  const joinNewText = intl.formatMessage(messages.joinNewText);

  const channels = Object.keys(channelData);
  let channelsBtns = <div />;
  if (channels.length === 0) {
    channelsBtns = <div key="empty">{emptyChannelsText}</div>;
  } else {
    channelsBtns = channels.map((chan) => (
      <ChannelItem key={`${chan}Btn`} channel={chan} />
    ));
  }

  return (
    <div>
      <Modal isOpen={open} toggle={onCloseChannelsModal} className={className}>
        <ModalHeader
          toggle={onCloseChannelsModal}
          close={CloseButton(onCloseChannelsModal)}
        >
          {channelsModalTitle}
        </ModalHeader>
        <ModalBody>
          <ListGroup>{channelsBtns}</ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              onCloseChannelsModal();
              onOpenJoinModal();
            }}
          >
            {joinNewText}
          </Button>{' '}
          <Button onClick={onCloseChannelsModal}>{cancelText}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

ChannelsModal.propTypes = {
  onCloseChannelsModal: PropTypes.func,
  channelData: PropTypes.object.isRequired,
  onOpenJoinModal: PropTypes.func,
  open: PropTypes.bool,
  className: PropTypes.string,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  channelData: makeSelectChannelData(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCloseChannelsModal: () => dispatch(closeChannelsModal()),
    onOpenJoinModal: () => dispatch(openJoinModal()),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(ChannelsModal);
