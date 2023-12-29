/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

/**
 * JoinModal exports the ui rendering functions to display the popup that asks for
 * name, password and a channel (if defaultChannel is empty)
 */

import React from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { GiRollingDices } from 'react-icons/gi';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  InputGroup,
  Input,
  InputGroupAddon,
} from 'components/BaseModal';

import { makeSelectJoinMenuChannel } from 'components/MainMenu/selectors';

import { joinChannel } from 'containers/CommunicationProvider/actions';
import {
  closeJoinModal,
  clearJoinModalChannel,
} from 'components/MainMenu/actions';
import messages from './messages';
import Form from './Form';
import RandomButton from './RandomButton';

export function JoinModal({
  onCloseJoinModal,
  onClearJoinModalChannel,
  open,
  onSubmitForm,
  defaultChannel,
  intl,
}) {
  // @todo Move this object into `components/BaseModal`
  const closeBtn = (
    <button type="button" className="close" onClick={onCloseJoinModal}>
      &times;
    </button>
  );
  const joinModalTitle = intl.formatMessage(messages.joinModalTitle);
  const joinModalUsername = intl.formatMessage(messages.joinModalUsername);
  const joinModalPassword = intl.formatMessage(messages.joinModalPassword);
  const joinModalChannel = intl.formatMessage(messages.joinModalChannel);
  const joinModalBtn = intl.formatMessage(messages.joinModalBtn);
  const cancelText = intl.formatMessage(messages.cancelText);

  const [invalidName, setInvalidName] = useStateIfMounted(false);
  const [invalidChannel, setInvalidChannel] = useStateIfMounted(false);

  const toggleInvalidName = () => setInvalidName(!invalidName);
  const clearInvalidName = () => setInvalidName(false);
  const toggleInvalidChannel = () => setInvalidChannel(!invalidChannel);
  const clearInvalidChannel = () => setInvalidChannel(false);

  const doClose = () => {
    onCloseJoinModal();
    onClearJoinModalChannel();
  };

  const hideChannel = !!defaultChannel;

  const [randomChannel, randomizeChannel] = useStateIfMounted('');

  const randomize = (e) => {
    e.preventDefault();
    randomizeChannel(Math.random().toString(36).substr(2, 8));
  };

  const handleSubmit = (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    if (evt !== undefined && evt.stopPropagation) evt.stopPropagation();
    if (evt !== undefined && evt.stopImmediatePropagation)
      evt.nativeEvent.stopImmediatePropagation();
    let err = false;
    const user = evt.target[0].value;
    if (!user) {
      err = true;
      toggleInvalidName();
    }
    const pass = evt.target[1].value;
    const chan = evt.target[2].value;
    if (!chan) {
      err = true;
      toggleInvalidChannel();
    }
    if (!err) onSubmitForm(user, pass, chan);
  };

  return (
    <div>
      <Modal isOpen={open} toggle={doClose} autoFocus={false}>
        <ModalHeader toggle={doClose} close={closeBtn}>
          {joinModalTitle}
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <InputGroup>
              <InputGroupAddon addonType="prepend">@</InputGroupAddon>
              <Input
                autoFocus
                invalid={invalidName}
                placeholder={joinModalUsername}
                onFocus={clearInvalidName}
              />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">#</InputGroupAddon>
              <Input type="password" placeholder={joinModalPassword} />
            </InputGroup>
            <InputGroup className={hideChannel ? 'd-none' : ''}>
              <InputGroupAddon addonType="prepend">!</InputGroupAddon>
              <Input
                invalid={invalidChannel}
                placeholder={joinModalChannel}
                defaultValue={defaultChannel || randomChannel || ''}
                onFocus={clearInvalidChannel}
              />
              <InputGroupAddon addonType="append">
                <RandomButton onClick={randomize}>
                  <GiRollingDices />
                </RandomButton>
              </InputGroupAddon>
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit">{joinModalBtn}</Button>{' '}
            <Button onClick={doClose}>{cancelText}</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

JoinModal.propTypes = {
  onCloseJoinModal: PropTypes.func,
  onClearJoinModalChannel: PropTypes.func,
  open: PropTypes.bool,
  onSubmitForm: PropTypes.func,
  defaultChannel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  defaultChannel: makeSelectJoinMenuChannel(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onCloseJoinModal: () => dispatch(closeJoinModal()),
    onClearJoinModalChannel: () => dispatch(clearJoinModalChannel()),
    onSubmitForm: (user, pass, chan) => {
      dispatch(clearJoinModalChannel());
      dispatch(closeJoinModal());
      dispatch(joinChannel(user, pass, chan));
    },
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(JoinModal);
