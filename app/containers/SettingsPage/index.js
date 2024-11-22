/**
 * SettingsPage allows the user to change application settings
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
import { FormGroup, Tooltip, Row, Col } from 'reactstrap';
import { IoGlobe } from 'react-icons/io5';
import { TfiReload } from 'react-icons/tfi';

import {
  Dropdown,
  WideDropdownMenu,
  WideDropdownItem,
  WideDropdownToggle,
  InputGroup,
  Input,
  InputGroupText,
} from 'components/BaseModal';

import MainMenu from 'components/MainMenu';
import Notifier from 'components/Notifier';

import NickColor from 'components/JoinModal/NickColor';
import RememberBox from 'components/JoinModal/RememberBox';

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
  const usernameColorText = intl.formatMessage(messages.usernameColorText);
  const rememberText = intl.formatMessage(messages.rememberText);
  const reconnectText = intl.formatMessage(messages.reconnectText);
  const languageText = intl.formatMessage(messages.languageText);
  const backBtnText = intl.formatMessage(messages.backBtnText);

  return (
    <div>
      <Helmet>
        <title>{headerText}</title>
        <meta name="description" content="Chat client settings" />
      </Helmet>
      <Row className="g-0">
        <Col md="1" sm="1">
          <MainMenu />
        </Col>
        <Col md="10" sm="10">
          <MainContainer>
            <h4>{headerText}</h4>
            <InputGroup>
              <InputGroupText addontype="prepend">@</InputGroupText>
              <Input
                autoFocus
                invalid={invalidName}
                placeholder={usernameText}
                onFocus={clearInvalidName}
                defaultValue={chosenUsername}
                onChange={(e) => {
                  setChosenUsername(e.target.value);
                  dispatch(setUsername(e.target.value));
                }}
              />
              <InputGroupText id="nickColorButton" addontype="append">
                <NickColor
                  color={chosenColor}
                  onChangeComplete={(color) => {
                    setChosenColor(color.hex);
                    dispatch(setColor(color.hex));
                  }}
                />
              </InputGroupText>
            </InputGroup>
            <InputGroup>
              <InputGroupText addontype="prepend">#</InputGroupText>
              <Input
                type="password"
                placeholder={passwordText}
                defaultValue={chosenPassword}
                onChange={(e) => {
                  setChosenPassword(e.target.value);
                  dispatch(setPassword(e.target.value));
                }}
              />
              <InputGroupText id="rememberMeInput" addontype="append">
                <RememberBox
                  type="checkbox"
                  checked={chosenDoStore}
                  onChange={() => {
                    setChosenDoStore(!chosenDoStore);
                    dispatch(setStoreChannelsFlag(!chosenDoStore));
                  }}
                />
              </InputGroupText>
            </InputGroup>
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
            <Dropdown
              isOpen={themePickerOpen}
              toggle={() => setThemePickerOpen(!themePickerOpen)}
            >
              <WideDropdownToggle caret>
                <FormattedMessage
                  id={messages.currentThemeText.id}
                  defaultMessage={messages.currentThemeText.defaultMessage}
                  values={{
                    themeName: chosenTheme,
                  }}
                />
              </WideDropdownToggle>
              <WideDropdownMenu>
                <WideDropdownItem
                  // todo Themes
                  onClick={() => {
                    setChosenTheme(chosenTheme);
                    dispatch(setTheme(chosenTheme));
                  }}
                >
                  {chosenTheme}
                </WideDropdownItem>
              </WideDropdownMenu>
            </Dropdown>
            <InputGroup>
              <InputGroupText addontype="prepend">
                <IoGlobe />
              </InputGroupText>
              <Input
                autoFocus
                placeholder={wsPathText}
                defaultValue={chosenWsPath}
                onChange={(e) => {
                  setChosenWsPath(e.target.value);
                  dispatch(setWsPath(e.target.value));
                }}
              />
              <InputGroupText id="reconnectButton" addontype="append">
                <ReconnectButton
                  onClick={() => console.log('todo reconnecting')}
                >
                  <TfiReload />
                </ReconnectButton>
              </InputGroupText>
            </InputGroup>
            <Row className="g-0">
              <Col md="6" sm="12">
                <FormGroup switch>
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
                </FormGroup>
                <FormGroup switch>
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
                </FormGroup>
                <FormGroup switch>
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
                </FormGroup>
                <FormGroup switch>
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
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup switch>
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
                </FormGroup>
                <FormGroup switch>
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
                </FormGroup>
                <FormGroup switch>
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
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <BackButton onClick={handleGoBack} text={backBtnText} />
              </Col>
            </Row>
          </MainContainer>
        </Col>
        <Col md="1" sm="0">
          <Notifier />
        </Col>
      </Row>
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
        isOpen={reconnectTTOpen}
        target="reconnectButton"
        toggle={() => setReconnectTTOpen(!reconnectTTOpen)}
      >
        {reconnectText}
      </Tooltip>
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
