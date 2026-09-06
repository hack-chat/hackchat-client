/**
 * SettingsPage allows the user to change application settings
 * @todo Wire up:
 * - Automatic Reconnect
 */

import React, { useMemo, useEffect, useCallback } from 'react';
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
import FooterSection from './FooterSection';
import ThemeSelect from './ThemeSelect';

const AVAILABLE_THEMES = ['default', 'light', 'hacker'];

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
  setNotify,
  setLoadSafeImages,
  setLoadUnsafeImages,
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
  makeSelectCachedNotifyEnabled,
  makeSelectCachedLoadSafeImages,
  makeSelectCachedLoadUnsafeImages,
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
  cachedNotifyEnabled,
  cachedLoadSafeImages,
  cachedLoadUnsafeImages,
  isLocaleModalOpen,
  onCloseLocaleModal,
  onOpenLocaleModal,
  channelData,
  onLeaveChannel,
  intl,
}) {
  const navigate = useNavigate();

  const handleGoBack = useCallback(() => {
    const channels = channelData ? Object.keys(channelData) : [];

    if (channels.length === 0) {
      navigate('/');
    } else {
      navigate(-1);
    }
  }, [channelData, navigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleGoBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleGoBack]);

  useInjectReducer({ key: 'settingsPage', reducer });

  const [invalidName, setInvalidName] = useStateIfMounted(false);
  const clearInvalidName = () => setInvalidName(false);

  const [chosenUsername, setChosenUsername] = useStateIfMounted(cachedUsername);
  const [chosenPassword, setChosenPassword] = useStateIfMounted(cachedPassword);
  const [currentColor, setCurrentColor] = useStateIfMounted(cachedColor);
  const [chosenDoStore, setChosenDoStore] = useStateIfMounted(cachedDoStore);
  const [chosenTheme, setChosenTheme] = useStateIfMounted(cachedTheme);
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
  const [chosenNotify, setChosenNotify] =
    useStateIfMounted(cachedNotifyEnabled);
  const [chosenLoadSafe, setChosenLoadSafe] =
    useStateIfMounted(cachedLoadSafeImages);
  const [chosenLoadUnsafe, setChosenLoadUnsafe] = useStateIfMounted(
    cachedLoadUnsafeImages,
  );

  useEffect(() => {
    if (cachedUsername !== chosenUsername)
      setChosenUsername(cachedUsername || '');
  }, [cachedUsername]);

  useEffect(() => {
    if (cachedPassword !== chosenPassword)
      setChosenPassword(cachedPassword || '');
  }, [cachedPassword]);

  useEffect(() => {
    if (cachedWsPath !== chosenWsPath)
      setChosenWsPath(cachedWsPath || 'wss://hack.chat/chat-ws');
  }, [cachedWsPath]);

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
  const enableNotificationsText = intl.formatMessage(
    messages.enableNotificationsText,
  );
  const loadSafeImagesText = intl.formatMessage(messages.loadSafeImagesText);
  const loadUnsafeImagesText = intl.formatMessage(
    messages.loadUnsafeImagesText,
  );
  const languageText = intl.formatMessage(messages.languageText);
  const backBtnText = intl.formatMessage(messages.backBtnText);
  const rememberText = intl.formatMessage(messages.rememberText);
  const usernameColorText = intl.formatMessage(messages.usernameColorText);

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
          <form onSubmit={(e) => e.preventDefault()}>
            <InputRow>
              <InputIcon>
                <IoPerson />
              </InputIcon>
              <ColorInputWrapper>
                <UsernameGroup>
                  <UsernameInput
                    autoFocus
                    $invalid={invalidName}
                    placeholder={usernameText}
                    autoComplete="username"
                    onFocus={clearInvalidName}
                    value={chosenUsername}
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
                autoComplete="current-password"
                value={chosenPassword}
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
          </form>
        </SettingsGroup>

        <SettingsGroup>
          <InputRow>
            <InputIcon>
              <IoGlobe />
            </InputIcon>
            <StyledInput
              placeholder={wsPathText}
              value={chosenWsPath}
              onChange={(e) => {
                setChosenWsPath(e.target.value);
                dispatch(setWsPath(e.target.value));
              }}
            />
          </InputRow>
        </SettingsGroup>

        <SettingsGroup $marginTop="20px">
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
            $disabled={!chosenAllowMarkdown}
            onClick={() => {
              if (!chosenAllowMarkdown) return;
              setChosenLoadSafe(!chosenLoadSafe);
              dispatch(setLoadSafeImages(!chosenLoadSafe));
            }}
          >
            <LabelText>{loadSafeImagesText}</LabelText>
            <BooleanSwitch checked={chosenLoadSafe} />
          </SwitchRow>

          <SwitchRow
            $disabled={!chosenAllowMarkdown}
            onClick={() => {
              if (!chosenAllowMarkdown) return;
              setChosenLoadUnsafe(!chosenLoadUnsafe);
              dispatch(setLoadUnsafeImages(!chosenLoadUnsafe));
            }}
          >
            <LabelText>{loadUnsafeImagesText}</LabelText>
            <BooleanSwitch checked={chosenLoadUnsafe} />
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

          <SwitchRow
            onClick={() => {
              setChosenNotify(!chosenNotify);
              dispatch(setNotify(!chosenNotify));
            }}
          >
            <LabelText>{enableNotificationsText}</LabelText>
            <BooleanSwitch checked={chosenNotify} />
          </SwitchRow>
        </SettingsGroup>

        <SettingsGroup>
          <ThemeRow>
            <LabelText>
              <FormattedMessage
                id={messages.currentThemeText.id}
                defaultMessage={messages.currentThemeText.defaultMessage}
                values={{ themeName: '' }}
              />
            </LabelText>
            <ThemeSelect
              value={chosenTheme}
              onChange={(e) => {
                const newTheme = e.target.value;
                setChosenTheme(newTheme);
                dispatch(setTheme(newTheme));
              }}
            >
              {AVAILABLE_THEMES.map((themeName) => (
                <option key={themeName} value={themeName}>
                  {themeName}
                </option>
              ))}
            </ThemeSelect>
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
  cachedNotifyEnabled: PropTypes.bool,
  cachedLoadSafeImages: PropTypes.bool,
  cachedLoadUnsafeImages: PropTypes.bool,
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
  cachedNotifyEnabled: makeSelectCachedNotifyEnabled(),
  cachedLoadSafeImages: makeSelectCachedLoadSafeImages(),
  cachedLoadUnsafeImages: makeSelectCachedLoadUnsafeImages(),
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
