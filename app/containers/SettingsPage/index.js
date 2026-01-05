/**
 * SettingsPage allows the user to change application settings
 * @todo This container is currently disabled pending revision
 */

import React from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { IoGlobe } from 'react-icons/io5';
import { TfiReload } from 'react-icons/tfi';

import MainMenu from 'components/MainMenu';
import { openLocaleModal } from 'components/MainMenu/actions';
import { useInjectReducer } from 'utils/injectReducer';

import MainContainer from './MainContainer';
import BooleanSwitch from './BooleanSwitch';
import ReconnectButton from './ReconnectButton';
import Label from './Label';
import WideButton from './WideButton';
import BackButton from './BackButton';

import {
  setUsername,
  setPassword,
  setColor,
  setStoreChannelsFlag,
  clearPrevChannels,
  setTheme,
  setAllowKatex,
  setAllowMarkdown,
  setAllowExternalCode,
  setLtr,
  setMenuBtnPos,
  setDoHighlight,
  setAutoConnect,
  setWsPath,
} from './actions';

import {
  makeSelectSettingsPage,
  makeSelectCachedUsername,
  makeSelectCachedPassword,
  makeSelectCachedColor,
  makeSelectCachedStoreChannels,
  makeSelectCachedPrevChannels,
  makeSelectCachedTheme,
  makeSelectCachedAllowKatex,
  makeSelectCachedAllowMarkdown,
  makeSelectCachedAllowExtCode,
  makeSelectCachedLTR,
  makeSelectCachedMenuBtnPos,
  makeSelectCachedHighlightMentions,
  makeSelectCachedAutoconnect,
  makeSelectCachedWsPath,
} from './selectors';

import reducer from './reducer';

import messages from './messages';

export function SettingsPage({
  dispatch,
  cachedUsername,
  cachedPassword,
  cachedColor,
  cachedDoStore,
  cachedPreviousChannels,
  cachedTheme,
  cachedAllowKatex,
  cachedAllowMarkdown,
  cachedAllowExtCode,
  cachedLtr,
  cachedMenuBtnPos,
  cachedDoHighlight,
  cachedDoAutoconnect,
  cachedWsPath,
  intl,
}) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  useInjectReducer({ key: 'settingsPage', reducer });

  const [invalidName, setInvalidName] = useStateIfMounted(false);
  const clearInvalidName = () => setInvalidName(false);

  const [chosenUsername, setChosenUsername] = useStateIfMounted(cachedUsername);
  const [chosenPassword, setChosenPassword] = useStateIfMounted(cachedPassword);
  const [chosenColor, setChosenColor] = useStateIfMounted(cachedColor);
  const [chosenDoStore, setChosenDoStore] = useStateIfMounted(cachedDoStore);
  const [chosenTheme, setChosenTheme] = useStateIfMounted(cachedTheme);
  const [themePickerOpen, setThemePickerOpen] = useStateIfMounted(false);
  const [chosenAllowKatex, setChosenAllowKatex] =
    useStateIfMounted(cachedAllowKatex);
  const [chosenAllowMarkdown, setChosenAllowMarkdown] =
    useStateIfMounted(cachedAllowMarkdown);
  const [chosenExtCode, setChosenExtCode] =
    useStateIfMounted(cachedAllowExtCode);
  const [chosenLtr, setChosenLtr] = useStateIfMounted(cachedLtr);
  const [chosenMenuBtnPos, setChosenMenuBtnPos] =
    useStateIfMounted(cachedMenuBtnPos);
  const [chosenDoHighlight, setChosenDoHighlight] =
    useStateIfMounted(cachedDoHighlight);
  const [chosenDoAutoconnect, setChosenDoAutoconnect] =
    useStateIfMounted(cachedDoAutoconnect);
  const [chosenWsPath, setChosenWsPath] = useStateIfMounted(cachedWsPath);

  const [nickColorTTOpen, setNickColorTTOpen] = useStateIfMounted(false);
  const [rememberMeTTOpen, setRememberMeTTOpen] = useStateIfMounted(false);
  const [reconnectTTOpen, setReconnectTTOpen] = useStateIfMounted(false);

  const headerText = intl.formatMessage(messages.header);
  const usernameText = intl.formatMessage(messages.usernameText);
  const passwordText = intl.formatMessage(messages.passwordText);
  const wsPathText = intl.formatMessage(messages.wsPathText);
  const allowKatexText = intl.formatMessage(messages.allowKatexText);
  const allowMarkdownText = intl.formatMessage(messages.allowMarkdownText);
  const allowExtCodeText = intl.formatMessage(messages.allowExtCodeText);
  const useLtrText = intl.formatMessage(messages.useLtrText);
  const menuPosText = intl.formatMessage(messages.menuPosText);
  const doHighlightsText = intl.formatMessage(messages.doHighlightsText);
  const autoReconnectText = intl.formatMessage(messages.autoReconnectText);
  const languageText = intl.formatMessage(messages.languageText);
  const backBtnText = intl.formatMessage(messages.backBtnText);

  return (
    <div>
      <Helmet>
        <title>{headerText}</title>
        <meta name="description" content="Chat client settings" />
      </Helmet>
      <div className="row g-0">
        <div className="col-md-1 col-sm-1">
          <MainMenu />
        </div>
        <div className="col-md-10 col-sm-10">
          <MainContainer>
            <h4>{headerText}</h4>

            <div>
              <span>@</span>
              <input
                autoFocus
                className={invalidName ? 'is-invalid' : ''}
                placeholder={usernameText}
                onFocus={clearInvalidName}
                defaultValue={chosenUsername}
                onChange={(e) => {
                  setChosenUsername(e.target.value);
                  dispatch(setUsername(e.target.value));
                }}
              />
              <span id="nickColorButton">
                <div style={{ padding: '5px', border: '1px solid #ccc' }}>
                  Color Picker Placeholder
                </div>
              </span>
            </div>

            <div style={{ marginTop: '10px' }}>
              <span>#</span>
              <input
                type="password"
                placeholder={passwordText}
                defaultValue={chosenPassword}
                onChange={(e) => {
                  setChosenPassword(e.target.value);
                  dispatch(setPassword(e.target.value));
                }}
              />
              <span id="rememberMeInput">
                <input
                  type="checkbox"
                  checked={chosenDoStore}
                  onChange={() => {
                    setChosenDoStore(!chosenDoStore);
                    dispatch(setStoreChannelsFlag(!chosenDoStore));
                  }}
                />
              </span>
            </div>

            <WideButton onClick={() => dispatch(clearPrevChannels())}>
              <FormattedMessage
                id={messages.clearHistoryText.id}
                defaultMessage={messages.clearHistoryText.defaultMessage}
                values={{
                  count: `${cachedPreviousChannels.length}`,
                }}
              />
            </WideButton>

            <WideButton onClick={() => dispatch(openLocaleModal())}>
              {languageText}
            </WideButton>

            <div style={{ margin: '10px 0', border: '1px solid #ccc' }}>
              <div onClick={() => {}}>
                <FormattedMessage
                  id={messages.currentThemeText.id}
                  defaultMessage={messages.currentThemeText.defaultMessage}
                  values={{
                    themeName: chosenTheme,
                  }}
                />
              </div>
              <div
                onClick={() => {
                  setChosenTheme(chosenTheme);
                  dispatch(setTheme(chosenTheme));
                }}
              >
                {chosenTheme}
              </div>
            </div>

            <div style={{ marginTop: '10px' }}>
              <span>
                <IoGlobe />
              </span>
              <input
                autoFocus
                placeholder={wsPathText}
                defaultValue={chosenWsPath}
                onChange={(e) => {
                  setChosenWsPath(e.target.value);
                  dispatch(setWsPath(e.target.value));
                }}
              />
              <span id="reconnectButton">
                <ReconnectButton
                  // eslint-disable-next-line no-console
                  onClick={() => console.log('todo reconnecting')}
                >
                  <TfiReload />
                </ReconnectButton>
              </span>
            </div>

            <div className="row g-0">
              <div className="col-md-6 col-sm-12">
                <div>
                  <BooleanSwitch
                    type="switch"
                    checked={chosenAllowKatex}
                    onChange={() => {
                      setChosenAllowKatex(!chosenAllowKatex);
                      dispatch(setAllowKatex(!chosenAllowKatex));
                    }}
                  />
                  <Label>
                    <h5>{allowKatexText}</h5>
                  </Label>
                </div>
                <div>
                  <BooleanSwitch
                    type="switch"
                    checked={chosenAllowMarkdown}
                    onChange={() => {
                      setChosenAllowMarkdown(!chosenAllowMarkdown);
                      dispatch(setAllowMarkdown(!chosenAllowMarkdown));
                    }}
                  />
                  <Label>
                    <h5>{allowMarkdownText}</h5>
                  </Label>
                </div>
                <div>
                  <BooleanSwitch
                    type="switch"
                    checked={chosenExtCode}
                    onChange={() => {
                      setChosenExtCode(!chosenExtCode);
                      dispatch(setAllowExternalCode(!chosenExtCode));
                    }}
                  />
                  <Label>
                    <h5>{allowExtCodeText}</h5>
                  </Label>
                </div>
                <div>
                  <BooleanSwitch
                    type="switch"
                    checked={chosenLtr}
                    onChange={() => {
                      setChosenLtr(!chosenLtr);
                      dispatch(setLtr(!chosenLtr));
                    }}
                  />
                  <Label>
                    <h5>{useLtrText}</h5>
                  </Label>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div>
                  <BooleanSwitch
                    type="switch"
                    checked={chosenMenuBtnPos}
                    onChange={() => {
                      setChosenMenuBtnPos(!chosenMenuBtnPos);
                      dispatch(setMenuBtnPos(!chosenMenuBtnPos));
                    }}
                  />
                  <Label>
                    <h5>{menuPosText}</h5>
                  </Label>
                </div>
                <div>
                  <BooleanSwitch
                    type="switch"
                    checked={chosenDoHighlight}
                    onChange={() => {
                      setChosenDoHighlight(!chosenDoHighlight);
                      dispatch(setDoHighlight(!chosenDoHighlight));
                    }}
                  />
                  <Label>
                    <h5>{doHighlightsText}</h5>
                  </Label>
                </div>
                <div>
                  <BooleanSwitch
                    type="switch"
                    checked={chosenDoAutoconnect}
                    onChange={() => {
                      setChosenDoAutoconnect(!chosenDoAutoconnect);
                      dispatch(setAutoConnect(!chosenDoAutoconnect));
                    }}
                  />
                  <Label>
                    <h5>{autoReconnectText}</h5>
                  </Label>
                </div>
              </div>
            </div>
            <div>
              <div>
                <BackButton onClick={handleGoBack} text={backBtnText} />
              </div>
            </div>
          </MainContainer>
        </div>
        <div className="col-md-1 col-sm-0">
          <div />
        </div>
      </div>
    </div>
  );
}

SettingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  cachedUsername: PropTypes.string,
  cachedPassword: PropTypes.string,
  cachedColor: PropTypes.string,
  cachedDoStore: PropTypes.bool,
  cachedPreviousChannels: PropTypes.array,
  cachedTheme: PropTypes.string,
  cachedAllowKatex: PropTypes.bool,
  cachedAllowMarkdown: PropTypes.bool,
  cachedAllowExtCode: PropTypes.bool,
  cachedLtr: PropTypes.bool,
  cachedMenuBtnPos: PropTypes.bool,
  cachedDoHighlight: PropTypes.bool,
  cachedDoAutoconnect: PropTypes.bool,
  cachedWsPath: PropTypes.string,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  settingsPage: makeSelectSettingsPage(),
  cachedUsername: makeSelectCachedUsername(),
  cachedPassword: makeSelectCachedPassword(),
  cachedColor: makeSelectCachedColor(),
  cachedDoStore: makeSelectCachedStoreChannels(),
  cachedPreviousChannels: makeSelectCachedPrevChannels(),
  cachedTheme: makeSelectCachedTheme(),
  cachedAllowKatex: makeSelectCachedAllowKatex(),
  cachedAllowMarkdown: makeSelectCachedAllowMarkdown(),
  cachedAllowExtCode: makeSelectCachedAllowExtCode(),
  cachedLtr: makeSelectCachedLTR(),
  cachedMenuBtnPos: makeSelectCachedMenuBtnPos(),
  cachedDoHighlight: makeSelectCachedHighlightMentions(),
  cachedDoAutoconnect: makeSelectCachedAutoconnect(),
  cachedWsPath: makeSelectCachedWsPath(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(SettingsPage);
