/**
 * JoinMenu exports
 */

import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateIfMounted } from 'use-state-if-mounted';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { GiRollingDices } from 'react-icons/gi';

import { joinChannel } from 'containers/CommunicationProvider/actions';

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
  makeSelectCachedPrevChannels,
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
import { SuggestionContainer, SuggestionItem } from './SuggestionBox';

const AutocompleteWrapper = styled.div`
  position: relative;
  width: 100%;

  &.hide {
    display: none;
  }
`;

export function JoinMenu({
  doToggle,
  onSubmitForm,
  username,
  password,
  prevColor,
  rememberUser,
  prevChannels,
  qString,
  intl,
}) {
  const navigate = useNavigate();

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
  const [suggestions, setSuggestions] = useStateIfMounted([]);
  const [activeSuggestion, setActiveSuggestion] = useStateIfMounted(0);
  const suggestionsRef = useRef(null);

  const toggleInvalidName = () => setInvalidName(!invalidName);
  const clearInvalidName = () => setInvalidName(false);
  const toggleRememberMe = () => setRememberMe(!rememberMe);
  const toggleInvalidChannel = () => setInvalidChannel(!invalidChannel);

  const hideChannel = !!qString;

  useEffect(() => {
    if (suggestionsRef.current) {
      const activeElement = suggestionsRef.current.querySelector('.active');
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeSuggestion]);

  const handleChannelChange = (e) => {
    const val = e.target.value;
    setChosenChannel(val);

    if (val && prevChannels && prevChannels.length > 0) {
      const filtered = prevChannels.filter((ch) =>
        ch.toLowerCase().includes(val.toLowerCase()),
      );
      setSuggestions(filtered);
      setActiveSuggestion(0);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (evt) => {
    if (suggestions.length === 0) return;

    if (evt.key === 'ArrowDown') {
      evt.preventDefault();
      setActiveSuggestion((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (evt.key === 'ArrowUp') {
      evt.preventDefault();
      setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (evt.key === 'Enter' || evt.key === 'Tab') {
      evt.preventDefault();
      setChosenChannel(suggestions[activeSuggestion]);
      setSuggestions([]);
    } else if (evt.key === 'Escape') {
      setSuggestions([]);
    }
  };

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

      navigate(`/?${chan}`);
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

      <AutocompleteWrapper className={hideChannel ? 'hide' : ''}>
        {suggestions.length > 0 && (
          <SuggestionContainer ref={suggestionsRef}>
            {suggestions.map((chan, index) => (
              <SuggestionItem
                key={chan}
                className={index === activeSuggestion ? 'active' : ''}
                onMouseDown={() => {
                  setChosenChannel(chan);
                  setSuggestions([]);
                }}
              >
                ?{chan}
              </SuggestionItem>
            ))}
          </SuggestionContainer>
        )}

        <InputGroup>
          <InputGroupText>?</InputGroupText>
          <Input
            autoComplete="off"
            className={invalidChannel ? 'invalid' : ''}
            placeholder={joinModalChannel}
            value={chosenChannel}
            onFocus={() => {
              setInvalidChannel(false);
              if (chosenChannel && prevChannels) {
                const filtered = prevChannels.filter((ch) =>
                  ch.toLowerCase().includes(chosenChannel.toLowerCase()),
                );
                setSuggestions(filtered);
              }
            }}
            onBlur={() => setSuggestions([])}
            onChange={handleChannelChange}
            onKeyDown={handleKeyDown}
          />
          <InputGroupText id="randomButton">
            <RandomButton
              title={randomButtonText}
              onClick={() => {
                const newChan = Math.random().toString(36).substr(2, 8);
                setChosenChannel(newChan);
                setSuggestions([]);
              }}
            >
              <GiRollingDices />
            </RandomButton>
          </InputGroupText>
        </InputGroup>
      </AutocompleteWrapper>

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
  prevChannels: PropTypes.array,
  qString: PropTypes.string,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectCachedUsername(),
  password: makeSelectCachedPassword(),
  prevColor: makeSelectCachedColor(),
  rememberUser: makeSelectCachedStoreChannels(),
  prevChannels: makeSelectCachedPrevChannels(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (user, pass, chan, color, remember) => {
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
