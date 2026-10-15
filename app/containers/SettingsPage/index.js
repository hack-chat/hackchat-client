/**
 * SettingsPage allows the user to change application settings
 */

import React, { useMemo, useEffect, useCallback, useRef } from 'react';
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

import {
  changeUsername,
  leaveChannel,
} from 'containers/CommunicationProvider/actions';
import { makeSelectChannelData } from 'containers/CommunicationProvider/selectors';

import Modal from 'components/Modal';
import LocaleModal from 'components/LocaleModal';
import ColorPicker from 'components/ColorPicker';
import ChannelList from 'components/ChannelList';
import GranularControlList from 'components/GranularControlList';

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
import NumericSettingRow from './NumericSettingRow';
import CollapsibleSection from './CollapsibleSection';
import StripedContainer from './StripedContainer';

const AVAILABLE_THEMES = [
  'default',
  'light',
  'hacker',
  'mlg-gamer',
  'amoled',
  'android',
  'android-white',
  'andromeda',
  'atelier-dune',
  'atelier-forest',
  'atelier-heath',
  'atelier-lakeside',
  'atelier-seaside',
  'banana',
  'bright',
  'bubblegum',
  'carrot',
  'catppuccin',
  'chalk',
  'eighties',
  'flamingo',
  'fresh-green',
  'fried-egg',
  'greenscreen',
  'gruvbox-light',
  'lax',
  'legacy-default',
  'legacy-hacker',
  'maniac',
  'mariana',
  'military',
  'milkyway',
  'mocha',
  'monokai',
  'nebula',
  'nese',
  'ocean',
  'omega',
  'pop',
  'railscasts',
  'retro',
  'solarized',
  'sunlight',
  'tk-night',
  'tomorrow',
  'ubuntu',
];

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
  setWsPath,
  setNotify,
  setMaxMessages,
  setEnablePreview,
  setLargeMode,
  setDomainWhitelist,
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
  makeSelectCachedWsPath,
  makeSelectCachedNotifyEnabled,
  makeSelectCachedMaxMessages,
  makeSelectCachedEnablePreview,
  makeSelectCachedLargeMode,
  makeSelectCachedDomainWhitelist,
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
  cachedWsPath,
  cachedNotifyEnabled,
  cachedMaxMessages,
  isLocaleModalOpen,
  onCloseLocaleModal,
  onOpenLocaleModal,
  channelData,
  onLeaveChannel,
  onChangeUsername,
  cachedEnablePreview,
  cachedLargeMode,
  cachedDomainWhitelist,
  intl,
}) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

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
  const [chosenWsPath, setChosenWsPath] = useStateIfMounted(cachedWsPath);
  const [chosenNotify, setChosenNotify] =
    useStateIfMounted(cachedNotifyEnabled);
  const [chosenMaxMessages, setChosenMaxMessages] =
    useStateIfMounted(cachedMaxMessages);
  const [chosenEnablePreview, setChosenEnablePreview] =
    useStateIfMounted(cachedEnablePreview);
  const [chosenLargeMode, setChosenLargeMode] =
    useStateIfMounted(cachedLargeMode);
  const [isDomainModalOpen, setIsDomainModalOpen] = useStateIfMounted(false);

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

  useEffect(() => {
    if (
      cachedMaxMessages !== undefined &&
      cachedMaxMessages !== chosenMaxMessages
    ) {
      setChosenMaxMessages(cachedMaxMessages);
    }
  }, [cachedMaxMessages]);

  useEffect(() => {
    const handleGlobalWheel = (e) => {
      if (isLocaleModalOpen || isDomainModalOpen) return;
      if (scrollRef.current && !scrollRef.current.contains(e.target)) {
        scrollRef.current.scrollTop += e.deltaY;
      }
    };
    window.addEventListener('wheel', handleGlobalWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleGlobalWheel);
    };
  }, [isLocaleModalOpen, isDomainModalOpen]);

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
  const enableNotificationsText = intl.formatMessage(
    messages.enableNotificationsText,
  );
  const languageText = intl.formatMessage(messages.languageText);
  const backBtnText = intl.formatMessage(messages.backBtnText);
  const rememberText = intl.formatMessage(messages.rememberText);
  const usernameColorText = intl.formatMessage(messages.usernameColorText);
  const maxMessagesText = intl.formatMessage(messages.maxMessagesText);
  const enablePreviewText = intl.formatMessage(messages.enablePreviewText);
  const largeModeText = intl.formatMessage(messages.largeModeText);
  const interfaceBehaviorTitle = intl.formatMessage(
    messages.interfaceBehaviorTitle,
  );
  const formattingMediaTitle = intl.formatMessage(
    messages.formattingMediaTitle,
  );
  const appearanceNotificationsTitle = intl.formatMessage(
    messages.appearanceNotificationsTitle,
  );
  const channelsHistoryTitle = intl.formatMessage(
    messages.channelsHistoryTitle,
  );
  const manageDomainWhitelist = intl.formatMessage(
    messages.manageDomainWhitelist,
  );
  const domainPlaceholder = intl.formatMessage(messages.domainPlaceholder);

  const joinedChannels = useMemo(
    () => (channelData ? Object.keys(channelData) : []),
    [channelData],
  );

  const whitelistStates = ['❌', '✅', '⚠️'];

  const domainWhitelistOptions = {
    keys: ['domain', 'safe'],
    states: whitelistStates,
    fields: [
      {
        name: 'domain',
        type: 'input',
        placeholder: domainPlaceholder,
      },
    ],
  };

  const domainWhitelistDefaults = useMemo(
    () =>
      cachedDomainWhitelist.map((item) => ({
        domain: item.domain,
        safe:
          whitelistStates[item.state] !== undefined
            ? whitelistStates[item.state]
            : '⚠️',
      })),
    [cachedDomainWhitelist],
  );

  const handleDomainWhitelistChange = (newContents) => {
    const reduxFormattedList = newContents.map((item) => ({
      domain: item.domain,
      state:
        whitelistStates.indexOf(item.safe) !== -1
          ? whitelistStates.indexOf(item.safe)
          : 2,
    }));

    dispatch(setDomainWhitelist(reduxFormattedList));
  };

  return (
    <MainContainer dir={chosenLtr ? 'ltr' : 'rtl'}>
      <Helmet>
        <title>{headerText}</title>
        <meta name="description" content={headerText} />
      </Helmet>

      <ScrollArea ref={scrollRef} $largeMode={chosenLargeMode}>
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
                    onChange={(e) => setChosenUsername(e.target.value)}
                    onBlur={() => {
                      if (chosenUsername !== cachedUsername) {
                        dispatch(setUsername(chosenUsername));
                        onChangeUsername(chosenUsername);
                      }
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

        <CollapsibleSection title={interfaceBehaviorTitle}>
          <StripedContainer>
            <NumericSettingRow>
              <LabelText>{maxMessagesText}</LabelText>
              <StyledInput
                type="number"
                min="0"
                style={{ width: '120px', textAlign: 'center' }}
                value={
                  chosenMaxMessages !== '' && chosenMaxMessages !== null
                    ? chosenMaxMessages
                    : ''
                }
                onChange={(e) => {
                  const val =
                    e.target.value === '' ? '' : parseInt(e.target.value, 10);
                  setChosenMaxMessages(val);
                }}
                onBlur={() => {
                  let finalVal = chosenMaxMessages;
                  if (finalVal === '') {
                    finalVal = 0;
                    setChosenMaxMessages(0);
                  }
                  if (finalVal !== cachedMaxMessages)
                    dispatch(setMaxMessages(finalVal));
                }}
              />
            </NumericSettingRow>

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
                setChosenLargeMode(!chosenLargeMode);
                dispatch(setLargeMode(!chosenLargeMode));
              }}
            >
              <LabelText>{largeModeText}</LabelText>
              <BooleanSwitch checked={chosenLargeMode} />
            </SwitchRow>
          </StripedContainer>
        </CollapsibleSection>

        <CollapsibleSection title={formattingMediaTitle}>
          <StripedContainer>
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
          </StripedContainer>

          <WideButton onClick={() => setIsDomainModalOpen(true)}>
            {manageDomainWhitelist}
          </WideButton>
        </CollapsibleSection>

        <CollapsibleSection title={appearanceNotificationsTitle}>
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
              name="theme"
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

          <StripedContainer>
            <SwitchRow
              onClick={() => {
                setChosenEnablePreview(!chosenEnablePreview);
                dispatch(setEnablePreview(!chosenEnablePreview));
              }}
            >
              <LabelText>{enablePreviewText}</LabelText>
              <BooleanSwitch checked={chosenEnablePreview} />
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
                setChosenNotify(!chosenNotify);
                dispatch(setNotify(!chosenNotify));
              }}
            >
              <LabelText>{enableNotificationsText}</LabelText>
              <BooleanSwitch checked={chosenNotify} />
            </SwitchRow>
          </StripedContainer>
        </CollapsibleSection>

        <CollapsibleSection title={channelsHistoryTitle}>
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
              values={{ count: `${cachedPreviousChannels.length}` }}
            />
          </WideButton>
        </CollapsibleSection>

        <WideButton onClick={onOpenLocaleModal}>{languageText}</WideButton>
        <FooterSection>
          <WideButton onClick={handleGoBack}>{backBtnText}</WideButton>
        </FooterSection>
      </ScrollArea>

      <Modal isOpen={isLocaleModalOpen} doToggle={onCloseLocaleModal}>
        <LocaleModal />
      </Modal>

      <Modal isOpen={isDomainModalOpen} doToggle={setIsDomainModalOpen} wide>
        <GranularControlList
          options={domainWhitelistOptions}
          defaults={domainWhitelistDefaults}
          onChangeFunc={handleDomainWhitelistChange}
          dir={chosenLtr ? 'ltr' : 'rtl'}
        />
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
  cachedWsPath: PropTypes.string,
  cachedNotifyEnabled: PropTypes.bool,
  cachedMaxMessages: PropTypes.number,
  isLocaleModalOpen: PropTypes.bool,
  onOpenLocaleModal: PropTypes.func,
  onCloseLocaleModal: PropTypes.func,
  channelData: PropTypes.object,
  onLeaveChannel: PropTypes.func,
  onChangeUsername: PropTypes.func,
  cachedEnablePreview: PropTypes.bool,
  cachedLargeMode: PropTypes.bool,
  cachedDomainWhitelist: PropTypes.array,
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
  cachedWsPath: makeSelectCachedWsPath(),
  cachedNotifyEnabled: makeSelectCachedNotifyEnabled(),
  cachedMaxMessages: makeSelectCachedMaxMessages(),
  isLocaleModalOpen: makeSelectIsLocaleModalOpen(),
  channelData: makeSelectChannelData(),
  cachedEnablePreview: makeSelectCachedEnablePreview(),
  cachedLargeMode: makeSelectCachedLargeMode(),
  cachedDomainWhitelist: makeSelectCachedDomainWhitelist(),
});

function mapDispatchToProps(dispatch) {
  return {
    onOpenLocaleModal: () => dispatch(openLocaleModal()),
    onCloseLocaleModal: () => dispatch(closeLocaleModal()),
    onLeaveChannel: (channel) => dispatch(leaveChannel(channel)),
    onChangeUsername: (username) => dispatch(changeUsername(username)),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(SettingsPage);
