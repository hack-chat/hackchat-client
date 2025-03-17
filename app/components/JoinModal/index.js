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
import { Tooltip } from 'reactstrap';

import {
  CloseButton,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  InputGroup,
  Input,
  InputGroupText,
} from 'components/BaseModal';

import { makeSelectJoinMenuChannel } from 'components/MainMenu/selectors';

import { joinChannel } from 'containers/CommunicationProvider/actions';
import {
  closeJoinModal,
  clearJoinModalChannel,
} from 'components/MainMenu/actions';

import {
  setUsername,
  setPassword,
  setColor,
  setStoreChannelsFlag,
  addPrevChannel,
} from 'containers/SettingsPage/actions';
import {
  makeSelectCachedUsername,
  makeSelectCachedPassword,
  makeSelectCachedColor,
  makeSelectCachedStoreChannels,
} from 'containers/SettingsPage/selectors';

import messages from './messages';
import Form from './Form';
import NickColor from './NickColor';
import RememberBox from './RememberBox';
import RandomButton from './RandomButton';

export function JoinModal({
  onCloseJoinModal,
  onClearJoinModalChannel,
  open,
  onSubmitForm,
  defaultChannel,
  username,
  password,
  prevColor,
  rememberUser,
  intl,
}) {
  const joinModalTitle = intl.formatMessage(messages.joinModalTitle);
  const joinModalUsername = intl.formatMessage(messages.joinModalUsername);
  const joinModalPassword = intl.formatMessage(messages.joinModalPassword);
  const joinModalChannel = intl.formatMessage(messages.joinModalChannel);
  const joinModalBtn = intl.formatMessage(messages.joinModalBtn);
  const cancelText = intl.formatMessage(messages.cancelText);
  const usernameColorText = intl.formatMessage(messages.usernameColorText);
  const rememberText = intl.formatMessage(messages.rememberText);
  const randomButtonText = intl.formatMessage(messages.randomButtonText);

  const [invalidName, setInvalidName] = useStateIfMounted(false);
  const [invalidChannel, setInvalidChannel] = useStateIfMounted(false);
  const [currentColor, setCurrentColor] = useStateIfMounted(prevColor);
  const [nickColorTTOpen, setNickColorTTOpen] = useStateIfMounted(false);
  const [rememberMeTTOpen, setRememberMeTTOpen] = useStateIfMounted(false);
  const [randomTTOpen, setRandomTTOpen] = useStateIfMounted(false);
  const [rememberMe, setRememberMe] = useStateIfMounted(rememberUser);
  const [chosenUsername, setChosenUsername] = useStateIfMounted(username);
  const [chosenPassword, setChosenPassword] = useStateIfMounted(password);
  const [chosenChannel, setChosenChannel] = useStateIfMounted(defaultChannel || '');

  const toggleInvalidName = () => setInvalidName(!invalidName);
  const clearInvalidName = () => setInvalidName(false);
  const toggleInvalidChannel = () => setInvalidChannel(!invalidChannel);

  const doCancel = () => {
    setChosenChannel('');
    onCloseJoinModal();
    onClearJoinModalChannel();
  };

  const hideChannel = !!defaultChannel;

  const [randomChannel, randomizeChannel] = useStateIfMounted('');

  const randomize = (e) => {
    e.preventDefault();
    randomizeChannel();
  };

  const handleSubmit = (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    if (evt !== undefined && evt.stopPropagation) evt.stopPropagation();
    if (evt !== undefined && evt.stopImmediatePropagation)
      evt.nativeEvent.stopImmediatePropagation();

    let err = false;

    if (!chosenUsername) {
      err = true;
      toggleInvalidName();
    }

    const chan = chosenChannel || defaultChannel;

    if (!chan) {
      err = true;
      toggleInvalidChannel();
    }

    if (!err)
      onSubmitForm(
        chosenUsername,
        chosenPassword,
        chan,
        currentColor,
        rememberMe,
      );
  };

  return (
    <div>
      <Modal isOpen={open} toggle={doCancel} autoFocus={false}>
        <ModalHeader toggle={doCancel} close={CloseButton(doCancel)}>
          {joinModalTitle}
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <InputGroup>
              <InputGroupText addontype="prepend">@</InputGroupText>
              <Input
                autoFocus
                invalid={invalidName}
                placeholder={joinModalUsername}
                onFocus={clearInvalidName}
                defaultValue={username}
                onChange={(e) => setChosenUsername(e.target.value)}
              />
              <InputGroupText id="nickColorButton" addontype="append">
                <NickColor
                  onChangeComplete={(color) => setCurrentColor(color.hex)}
                />
              </InputGroupText>
            </InputGroup>
            <InputGroup>
              <InputGroupText addontype="prepend">#</InputGroupText>
              <Input
                type="password"
                placeholder={joinModalPassword}
                defaultValue={password}
                onChange={(e) => setChosenPassword(e.target.value)}
              />
              <InputGroupText id="rememberMeInput" addontype="append">
                <RememberBox
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
              </InputGroupText>
            </InputGroup>
            <InputGroup className={hideChannel ? 'd-none' : ''}>
              <InputGroupText addontype="prepend">!</InputGroupText>
              <Input
                invalid={invalidChannel}
                placeholder={joinModalChannel}
                defaultValue={chosenChannel}
                onFocus={() => setInvalidChannel(false)}
                onChange={(e) => setChosenChannel(e.target.value)}
              />
              <InputGroupText id="randomButton" addontype="append">
                <RandomButton
                  onClick={() => {
                    const newChan = Math.random().toString(36).substr(2, 8);
                    setChosenChannel(newChan);
                  }}
                >
                  <GiRollingDices />
                </RandomButton>
              </InputGroupText>
            </InputGroup>
            <Tooltip
              isOpen={nickColorTTOpen}
              target="nickColorButton"
              toggle={() => setNickColorTTOpen(!nickColorTTOpen)}
            >
              {usernameColorText}
            </Tooltip>
            <Tooltip
              isOpen={rememberMeTTOpen}
              target="rememberMeInput"
              toggle={() => setRememberMeTTOpen(!rememberMeTTOpen)}
            >
              {rememberText}
            </Tooltip>
            <Tooltip
              isOpen={randomTTOpen}
              target="randomButton"
              toggle={() => setRandomTTOpen(!randomTTOpen)}
            >
              {randomButtonText}
            </Tooltip>
          </ModalBody>
          <ModalFooter>
            <Button type="submit">{joinModalBtn}</Button>{' '}
            <Button onClick={doCancel}>{cancelText}</Button>
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
  username: PropTypes.string,
  password: PropTypes.string,
  prevColor: PropTypes.string,
  rememberUser: PropTypes.bool,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  defaultChannel: makeSelectJoinMenuChannel(),
  username: makeSelectCachedUsername(),
  password: makeSelectCachedPassword(),
  prevColor: makeSelectCachedColor(),
  rememberUser: makeSelectCachedStoreChannels(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onCloseJoinModal: () => dispatch(closeJoinModal()),
    onClearJoinModalChannel: () => dispatch(clearJoinModalChannel()),
    onSubmitForm: (user, pass, chan, color, remember) => {
      dispatch(clearJoinModalChannel());
      dispatch(closeJoinModal());

      dispatch(setStoreChannelsFlag(remember));

      if (remember) {
        dispatch(setUsername(user));
        dispatch(setPassword(pass));
        dispatch(setColor(color));
        dispatch(addPrevChannel(chan));
      }

      dispatch(joinChannel(user, pass, chan, color));
    },
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(JoinModal);
