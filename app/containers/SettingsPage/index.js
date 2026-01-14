/**
 * SettingsPage allows the user to change application settings
 * @todo Some elements are not implemented yet
 */

import React, { useMemo } from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { IoGlobe, IoPerson, IoKey } from 'react-icons/io5';

import {
  closeLocaleModal,
  openLocaleModal,
} from 'containers/LanguageProvider/actions';
import { makeSelectIsLocaleModalOpen } from 'containers/LanguageProvider/selectors';

import { SHOW_TOAST } from 'containers/ToastNotifier/constants';

import { leaveChannel } from 'containers/CommunicationProvider/actions';
import { makeSelectChannelData } from 'containers/CommunicationProvider/selectors';

import Modal from 'components/Modal';
import LocaleModal from 'components/LocaleModal';
import ColorPicker from 'components/ColorPicker';
import ChannelList from 'components/ChannelList';

import { useInjectReducer } from 'utils/injectReducer';

import MainContainer from './MainContainer';
import BooleanSwitch from './BooleanSwitch';
import StyledInput from './StyledInput';
import WideButton from './WideButton';
import LabelText from './LabelText';
import SettingsGroup from './SettingsGroup';
import ScrollArea from './ScrollArea';
import InputRow from './InputRow';
import InputIcon from './InputIcon';
import ColorInputWrapper from './ColorInputWrapper';
import UsernameGroup from './UsernameGroup';
import UsernameInput from './UsernameInput';
import ColorSquare from './ColorSquare';
import SwitchRow from './SwitchRow';
import ThemeRow from './ThemeRow';
import ThemeButton from './ThemeButton';
import FooterSection from './FooterSection';

import {
  setUsername,
  setPassword,
  setColor,
  setStoreChannelsFlag,
  clearPrevChannels,
  // setTheme,
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
  // cachedTheme,
  cachedAllowKatex,
  cachedAllowMarkdown,
  cachedAllowExtCode,
  cachedLtr,
  cachedMenuBtnPos,
  cachedDoHighlight,
  cachedDoAutoconnect,
  cachedWsPath,
  isLocaleModalOpen,
  onCloseLocaleModal,
  onOpenLocaleModal,
  channelData,
  onLeaveChannel,
  intl,
}) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    const channels = channelData ? Object.keys(channelData) : [];
    if (channels.length > 0) {
      navigate(`/?${channels[0]}`);
    } else {
      navigate('/');
    }
  };

  useInjectReducer({ key: 'settingsPage', reducer });

  const [invalidName, setInvalidName] = useStateIfMounted(false);
  const clearInvalidName = () => setInvalidName(false);

  const [chosenUsername, setChosenUsername] = useStateIfMounted(cachedUsername);
  const [chosenPassword, setChosenPassword] = useStateIfMounted(cachedPassword);
  const [currentColor, setCurrentColor] = useStateIfMounted(cachedColor);
  const [chosenDoStore, setChosenDoStore] = useStateIfMounted(cachedDoStore);
  // const [chosenTheme, setChosenTheme] = useStateIfMounted(cachedTheme);
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
  const rememberText = intl.formatMessage(messages.rememberText);
  const usernameColorText = intl.formatMessage(messages.usernameColorText);
  const changeThemeText = intl.formatMessage(messages.changeThemeText);
  const themeNoticeText = intl.formatMessage(messages.themeNoticeText);

  const joinedChannels = useMemo(
    () => (channelData ? Object.keys(channelData) : []),
    [channelData],
  );

  return (
    <MainContainer>
      <Helmet>
        <title>{headerText}</title>
        <meta name="description" content={headerText} />
      </Helmet>

      <ScrollArea>
        <h4>{headerText}</h4>

        <SettingsGroup>
          <InputRow>
            <InputIcon>
              <IoPerson />
            </InputIcon>
            <ColorInputWrapper>
              <UsernameGroup>
                <UsernameInput
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
                <ColorSquare>
                  <ColorPicker
                    title={usernameColorText}
                    initColor={currentColor}
                    onChangeComplete={(color) => {
                      setCurrentColor(color.hex);
                      dispatch(setColor(color.hex));
                    }}
                  />
                </ColorSquare>
              </UsernameGroup>
            </ColorInputWrapper>
          </InputRow>

          <InputRow>
            <InputIcon>
              <IoKey />
            </InputIcon>
            <StyledInput
              type="password"
              placeholder={passwordText}
              defaultValue={chosenPassword}
              onChange={(e) => {
                setChosenPassword(e.target.value);
                dispatch(setPassword(e.target.value));
              }}
            />
          </InputRow>

          <SwitchRow
            onClick={() => {
              setChosenDoStore(!chosenDoStore);
              dispatch(setStoreChannelsFlag(!chosenDoStore));
            }}
          >
            <LabelText>{rememberText}</LabelText>
            <BooleanSwitch checked={chosenDoStore} />
          </SwitchRow>
        </SettingsGroup>

        <SettingsGroup>
          <InputRow>
            <InputIcon>
              <IoGlobe />
            </InputIcon>
            <StyledInput
              placeholder={wsPathText}
              defaultValue={chosenWsPath}
              onChange={(e) => {
                setChosenWsPath(e.target.value);
                dispatch(setWsPath(e.target.value));
              }}
            />
          </InputRow>
        </SettingsGroup>

        <SettingsGroup style={{ marginTop: '20px' }}>
          <SwitchRow
            onClick={() => {
              setChosenAllowKatex(!chosenAllowKatex);
              dispatch(setAllowKatex(!chosenAllowKatex));
            }}
          >
            <LabelText>{allowKatexText}</LabelText>
            <BooleanSwitch checked={chosenAllowKatex} />
          </SwitchRow>

          <SwitchRow
            onClick={() => {
              setChosenAllowMarkdown(!chosenAllowMarkdown);
              dispatch(setAllowMarkdown(!chosenAllowMarkdown));
            }}
          >
            <LabelText>{allowMarkdownText}</LabelText>
            <BooleanSwitch checked={chosenAllowMarkdown} />
          </SwitchRow>

          <SwitchRow
            onClick={() => {
              setChosenExtCode(!chosenExtCode);
              dispatch(setAllowExternalCode(!chosenExtCode));
            }}
          >
            <LabelText>{allowExtCodeText}</LabelText>
            <BooleanSwitch checked={chosenExtCode} />
          </SwitchRow>

          <SwitchRow
            onClick={() => {
              setChosenLtr(!chosenLtr);
              dispatch(setLtr(!chosenLtr));
            }}
          >
            <LabelText>{useLtrText}</LabelText>
            <BooleanSwitch checked={chosenLtr} />
          </SwitchRow>

          <SwitchRow
            onClick={() => {
              setChosenMenuBtnPos(!chosenMenuBtnPos);
              dispatch(setMenuBtnPos(!chosenMenuBtnPos));
            }}
          >
            <LabelText>{menuPosText}</LabelText>
            <BooleanSwitch checked={chosenMenuBtnPos} />
          </SwitchRow>

          <SwitchRow
            onClick={() => {
              setChosenDoHighlight(!chosenDoHighlight);
              dispatch(setDoHighlight(!chosenDoHighlight));
            }}
          >
            <LabelText>{doHighlightsText}</LabelText>
            <BooleanSwitch checked={chosenDoHighlight} />
          </SwitchRow>

          <SwitchRow
            onClick={() => {
              setChosenDoAutoconnect(!chosenDoAutoconnect);
              dispatch(setAutoConnect(!chosenDoAutoconnect));
            }}
          >
            <LabelText>{autoReconnectText}</LabelText>
            <BooleanSwitch checked={chosenDoAutoconnect} />
          </SwitchRow>
        </SettingsGroup>

        <SettingsGroup>
          <ThemeRow>
            <LabelText>
              <FormattedMessage
                id={messages.currentThemeText.id}
                defaultMessage={messages.currentThemeText.defaultMessage}
                values={{ themeName: /* chosenTheme */ 'default' }}
              />
            </LabelText>
            <ThemeButton
              onClick={() => {
                dispatch({
                  type: SHOW_TOAST,
                  payload: {
                    message: themeNoticeText,
                    type: 'warning',
                  },
                });
              }}
            >
              {changeThemeText}
            </ThemeButton>
          </ThemeRow>
        </SettingsGroup>

        <SettingsGroup>
          <ChannelList
            channels={joinedChannels}
            onLeaveChannel={(ch) => onLeaveChannel(ch)}
          />
        </SettingsGroup>

        <WideButton onClick={() => dispatch(clearPrevChannels())}>
          <FormattedMessage
            id={messages.clearHistoryText.id}
            defaultMessage={messages.clearHistoryText.defaultMessage}
            values={{
              count: `${cachedPreviousChannels.length}`,
            }}
          />
        </WideButton>

        <WideButton onClick={onOpenLocaleModal}>{languageText}</WideButton>

        <FooterSection>
          <WideButton onClick={handleGoBack}>{backBtnText}</WideButton>
        </FooterSection>
      </ScrollArea>

      <Modal isOpen={isLocaleModalOpen} doToggle={onCloseLocaleModal}>
        <LocaleModal />
      </Modal>
    </MainContainer>
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
  isLocaleModalOpen: PropTypes.bool,
  onOpenLocaleModal: PropTypes.func,
  onCloseLocaleModal: PropTypes.func,
  channelData: PropTypes.object,
  onLeaveChannel: PropTypes.func,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
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
  isLocaleModalOpen: makeSelectIsLocaleModalOpen(),
  channelData: makeSelectChannelData(),
});

function mapDispatchToProps(dispatch) {
  return {
    onOpenLocaleModal: () => dispatch(openLocaleModal()),
    onCloseLocaleModal: () => dispatch(closeLocaleModal()),
    onLeaveChannel: (channel) => dispatch(leaveChannel(channel)),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(SettingsPage);
