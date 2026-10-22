/**
 * JoinMenu exports
 */

import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { GiRollingDices } from 'react-icons/gi';

import {
  joinChannel,
  setAgreedTos,
} from 'containers/CommunicationProvider/actions';
import { makeSelectHasAgreedTos } from 'containers/CommunicationProvider/selectors';

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
import SuggestionContainer from './SuggestionContainer';
import SuggestionItem from './SuggestionItem';
import AutocompleteWrapper from './AutocompleteWrapper';
import TipBox from './TipBox';
import TosBox from './TosBox';
import TosLabel from './TosLabel';

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
  isActivelyJoined,
  activeUsername,
  hasAgreedTos,
  onAgreeTos,
}) {
  const navigate = useNavigate();

  const joinModalUsername = intl.formatMessage(messages.joinModalUsername);
  const joinModalPassword = intl.formatMessage(messages.joinModalPassword);
  const joinModalChannel = intl.formatMessage(messages.joinModalChannel);
  const joinModalBtn = intl.formatMessage(messages.joinModalBtn);
  const usernameColorText = intl.formatMessage(messages.usernameColorText);
  const rememberText = intl.formatMessage(messages.rememberText);
  const randomButtonText = intl.formatMessage(messages.randomButtonText);
  const logoutTip = intl.formatMessage(messages.logoutTip);

  const [invalidName, setInvalidName] = useState(false);
  const [invalidChannel, setInvalidChannel] = useState(false);
  const [tosChecked, setTosChecked] = useState(false);
  const [tosError, setTosError] = useState(false);
  const [currentColor, setCurrentColor] = useState(prevColor);
  const [rememberMe, setRememberMe] = useState(rememberUser);
  const [chosenUsername, setChosenUsername] = useState(username || '');
  const [chosenPassword, setChosenPassword] = useState(password || '');
  const [chosenChannel, setChosenChannel] = useState(qString || '');
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    if (username !== undefined && !chosenUsername) setChosenUsername(username);
  }, [username, chosenUsername, setChosenUsername]);

  useEffect(() => {
    if (password !== undefined && !chosenPassword) setChosenPassword(password);
  }, [password, chosenPassword, setChosenPassword]);

  useEffect(() => {
    if (prevColor !== undefined && !currentColor) setCurrentColor(prevColor);
  }, [prevColor, currentColor, setCurrentColor]);

  const toggleInvalidName = () => setInvalidName(!invalidName);
  const clearInvalidName = () => setInvalidName(false);
  const toggleRememberMe = () => setRememberMe(!rememberMe);
  const toggleInvalidChannel = () => setInvalidChannel(!invalidChannel);

  const hideChannel = !isActivelyJoined && !!qString;

  useEffect(() => {
    setChosenChannel(qString || '');
  }, [qString, setChosenChannel]);

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
    if (suggestions.length === 0) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        doJoin(evt);
      }
      return;
    }

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
    if (!evt || !evt.isTrusted) return;

    if (evt.preventDefault) evt.preventDefault();
    if (evt.stopPropagation) evt.stopPropagation();
    if (evt.stopImmediatePropagation)
      evt.nativeEvent.stopImmediatePropagation();

    let err = false;

    if (!isActivelyJoined && !chosenUsername) {
      err = true;
      toggleInvalidName();
    }

    const chan = !isActivelyJoined && qString ? qString : chosenChannel;

    if (!chan) {
      err = true;
      toggleInvalidChannel();
    }

    if (hasAgreedTos === false && tosChecked === false) {
      err = true;
      setTosError(true);
    }

    if (!err) {
      if (hasAgreedTos === false && tosChecked === true) {
        onAgreeTos();
      }

      onSubmitForm(
        isActivelyJoined
          ? activeUsername || username || chosenUsername
          : chosenUsername,
        isActivelyJoined ? password || chosenPassword : chosenPassword,
        chan,
        isActivelyJoined ? prevColor || currentColor : currentColor,
        rememberMe,
        isActivelyJoined,
      );

      if (typeof doToggle === 'function') doToggle(true, chan);

      navigate(`/?${chan}`);
    }
  };

  const handleLinkClick = (e) => e.stopPropagation();

  return (
    <Form onSubmit={doJoin}>
      {!isActivelyJoined ? (
        <>
          <InputGroup>
            <InputGroupText>@</InputGroupText>
            <Input
              name="username"
              autoComplete="username"
              autoFocus
              $invalid={invalidName}
              placeholder={joinModalUsername}
              onFocus={clearInvalidName}
              value={chosenUsername}
              onChange={(e) => setChosenUsername(e.target.value)}
            />
            <InputGroupText>
              <NickColor
                tabIndex={-1}
                title={usernameColorText}
                initColor={currentColor}
                onChangeComplete={(color) => setCurrentColor(color.hex)}
              />
            </InputGroupText>
          </InputGroup>

          <InputGroup>
            <InputGroupText>#</InputGroupText>
            <Input
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder={joinModalPassword}
              value={chosenPassword}
              onChange={(e) => setChosenPassword(e.target.value)}
            />
            <InputGroupText>
              <RememberBox
                title={rememberText}
                $isChecked={rememberMe}
                onClick={() => toggleRememberMe()}
              />
            </InputGroupText>
          </InputGroup>
        </>
      ) : (
        <TipBox>💡 {logoutTip}</TipBox>
      )}

      {!hideChannel && (
        <AutocompleteWrapper>
          {suggestions.length > 0 && (
            <SuggestionContainer ref={suggestionsRef}>
              {suggestions.map((chan, index) => (
                <SuggestionItem
                  key={chan}
                  $isActive={index === activeSuggestion}
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
              name="channel"
              autoComplete="off"
              $invalid={invalidChannel}
              placeholder={joinModalChannel}
              value={chosenChannel}
              autoFocus={isActivelyJoined}
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
                type="button"
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
      )}

      {!hasAgreedTos && (
        <TosLabel $error={tosError}>
          <input
            type="checkbox"
            style={{ display: 'none' }}
            checked={tosChecked}
            onChange={(e) => {
              setTosChecked(e.target.checked);
              if (e.target.checked) setTosError(false);
            }}
          />
          <TosBox $isChecked={tosChecked} />
          <div>
            <FormattedMessage
              id={messages.tosAgreement.id}
              defaultMessage={messages.tosAgreement.defaultMessage}
              values={{
                tosLink: (
                  <Link
                    to="/tos"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                  >
                    {intl.formatMessage(messages.tosLinkText)}
                  </Link>
                ),
                privacyLink: (
                  <Link
                    to="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                  >
                    {intl.formatMessage(messages.privacyLinkText)}
                  </Link>
                ),
              }}
            />
          </div>
        </TosLabel>
      )}

      <JoinButton onClick={doJoin}>{joinModalBtn}</JoinButton>
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
  isActivelyJoined: PropTypes.bool,
  activeUsername: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectCachedUsername(),
  password: makeSelectCachedPassword(),
  prevColor: makeSelectCachedColor(),
  rememberUser: makeSelectCachedStoreChannels(),
  prevChannels: makeSelectCachedPrevChannels(),
  hasAgreedTos: makeSelectHasAgreedTos(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (user, pass, chan, color, remember, isActivelyJoined) => {
      if (!isActivelyJoined) {
        dispatch(setStoreChannelsFlag(remember));
        dispatch(setUsername(user, remember));

        if (remember) {
          dispatch(setColor(color));
          dispatch(setPassword(pass));
        }
      }

      if (remember) {
        dispatch(addPrevChannel(chan));
      }

      dispatch(joinChannel(user, pass, chan, color));
    },
    onAgreeTos: () => dispatch(setAgreedTos()),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(JoinMenu);
