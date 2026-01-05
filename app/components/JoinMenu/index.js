/**
 * JoinMenu exports
 */

import React from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { GiRollingDices } from 'react-icons/gi';

import { joinChannel } from 'containers/CommunicationProvider/actions';
import { clearJoinModalChannel } from 'components/MainMenu/actions';

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
import InputGroup from './InputGroup';
import InputGroupText from './InputGroupText';
import Input from './Input';
import NickColor from './NickColor';
import RememberBox from './RememberBox';
import RandomButton from './RandomButton';
import JoinButton from './JoinButton';

export function JoinMenu({
  doToggle,
  onSubmitForm,
  username,
  password,
  prevColor,
  rememberUser,
  qString,
  intl,
}) {
  const joinModalUsername = intl.formatMessage(messages.joinModalUsername);
  const joinModalPassword = intl.formatMessage(messages.joinModalPassword);
  const joinModalChannel = intl.formatMessage(messages.joinModalChannel);
  const joinModalBtn = intl.formatMessage(messages.joinModalBtn);
  const usernameColorText = intl.formatMessage(messages.usernameColorText);
  const rememberText = intl.formatMessage(messages.rememberText);
  const randomButtonText = intl.formatMessage(messages.randomButtonText);

  const [invalidName, setInvalidName] = useStateIfMounted(false);
  const [invalidChannel, setInvalidChannel] = useStateIfMounted(false);
  const [currentColor, setCurrentColor] = useStateIfMounted(prevColor);
  const [rememberMe, setRememberMe] = useStateIfMounted(rememberUser);
  const [chosenUsername, setChosenUsername] = useStateIfMounted(username);
  const [chosenPassword, setChosenPassword] = useStateIfMounted(password);
  const [chosenChannel, setChosenChannel] = useStateIfMounted(qString || '');

  const toggleInvalidName = () => setInvalidName(!invalidName);
  const clearInvalidName = () => setInvalidName(false);
  const toggleRememberMe = () => setRememberMe(!rememberMe);
  const toggleInvalidChannel = () => setInvalidChannel(!invalidChannel);

  const hideChannel = !!qString;

  const doJoin = (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    if (evt !== undefined && evt.stopPropagation) evt.stopPropagation();
    if (evt !== undefined && evt.stopImmediatePropagation)
      evt.nativeEvent.stopImmediatePropagation();

    let err = false;

    if (!chosenUsername) {
      err = true;
      toggleInvalidName();
    }

    const chan = chosenChannel || qString;

    if (!chan) {
      err = true;
      toggleInvalidChannel();
    }

    if (!err) {
      onSubmitForm(
        chosenUsername,
        chosenPassword,
        chan,
        currentColor,
        rememberMe,
      );

      if (typeof doToggle === 'function') doToggle();
    }
  };

  return (
    <Form>
      <InputGroup>
        <InputGroupText>@</InputGroupText>
        <Input
          autoComplete="on"
          autoFocus
          className={invalidName ? 'invalid' : ''}
          placeholder={joinModalUsername}
          onFocus={clearInvalidName}
          defaultValue={username}
          onChange={(e) => setChosenUsername(e.target.value)}
        />
        <InputGroupText>
          <NickColor
            title={usernameColorText}
            initColor={currentColor}
            onChangeComplete={(color) => setCurrentColor(color.hex)}
          />
        </InputGroupText>
      </InputGroup>
      <InputGroup>
        <InputGroupText>#</InputGroupText>
        <Input
          type="password"
          autoComplete="on"
          placeholder={joinModalPassword}
          defaultValue={password}
          onChange={(e) => setChosenPassword(e.target.value)}
        />
        <InputGroupText>
          <RememberBox
            title={rememberText}
            className={rememberMe === true ? 'checked' : 'unchecked'}
            onClick={() => toggleRememberMe()}
          />
        </InputGroupText>
      </InputGroup>
      <InputGroup className={hideChannel ? 'hide' : ''}>
        <InputGroupText>!</InputGroupText>
        <Input
          autoComplete="on"
          className={invalidChannel ? 'invalid' : ''}
          placeholder={joinModalChannel}
          defaultValue={chosenChannel}
          onFocus={() => setInvalidChannel(false)}
          onChange={(e) => setChosenChannel(e.target.value)}
        />
        <InputGroupText id="randomButton">
          <RandomButton
            title={randomButtonText}
            onClick={() => {
              const newChan = Math.random().toString(36).substr(2, 8);
              setChosenChannel(newChan);
            }}
          >
            <GiRollingDices />
          </RandomButton>
        </InputGroupText>
      </InputGroup>
      <JoinButton onClick={(e) => doJoin(e)}>{joinModalBtn}</JoinButton>
    </Form>
  );
}

JoinMenu.propTypes = {
  doToggle: PropTypes.func,
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string,
  prevColor: PropTypes.string,
  rememberUser: PropTypes.bool,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectCachedUsername(),
  password: makeSelectCachedPassword(),
  prevColor: makeSelectCachedColor(),
  rememberUser: makeSelectCachedStoreChannels(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (user, pass, chan, color, remember) => {
      dispatch(clearJoinModalChannel());

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

export default compose(withConnect, injectIntl)(JoinMenu);
