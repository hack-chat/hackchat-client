/**
 * HomePage will
 */

import React, {
  useEffect,
  useMemo,
  useState,
  memo,
  useRef,
  useCallback,
} from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import DOMPurify from 'dompurify';
import styled, { keyframes } from 'styled-components';

import { FaMarkdown, FaGithub } from 'react-icons/fa6';
import { SiLatex } from 'react-icons/si';
import { FaFileCode } from 'react-icons/fa';

import {
  changeChannel,
  sendChat,
  kickUser,
  banUser,
  ignoreUser,
  inviteUser,
  muteUser,
  unmuteUser,
  uwuifyUser,
  leaveChannel,
  clearChannel,
  clearAuthReqs,
} from 'containers/CommunicationProvider/actions';
import {
  makeSelectChannel,
  makeSelectChannelData,
  makeSelectMeta,
  makeSelectSessionReady,
  makeSelectPendingCaptcha,
  makeSelectPendingPasswordReq,
} from 'containers/CommunicationProvider/selectors';

import { makeSelectIsLocaleModalOpen } from 'containers/LanguageProvider/selectors';
import {
  closeLocaleModal,
  openLocaleModal,
} from 'containers/LanguageProvider/actions';

import {
  disconnectWallet,
  signMessageRequest,
  doTransfer,
} from 'containers/WalletLayer/actions';
import {
  makeSelectConnectedTo,
  makeSelectConnectedAccount,
  makeSelectPendingSignRequest,
} from 'containers/WalletLayer/selectors';

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
} from 'containers/SettingsPage/selectors';

import LoadingIndicator from 'components/LoadingIndicator';
import ChatManager from 'components/ChatManager';
import ChatInput from 'components/ChatInput';
import Modal from 'components/Modal';
import JoinMenu from 'components/JoinMenu';
import LocaleModal from 'components/LocaleModal';
import MainMenu from 'components/MainMenu';
import WalletMenu from 'components/WalletMenu';
import ChannelList from 'components/ChannelList';

import messages from './messages';

import MainContainer from './MainContainer';
import ChatLayout from './ChatLayout';
import LandingPageContents from './Contents';
import Banner from './Banner';
import Center from './Center';
import Socials from './Socials';
import ChannelRow from './ChannelRow';
import ChannelButton from './ChannelButton';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalLabel from './ModalLabel';
import ModalActions from './ModalActions';
import CodeBox from './CodeBox';
import CodeText from './CodeText';
import CodeAction from './CodeAction';
import ResetButton from './ResetButton';
import CaptchaText from './CaptchaText';

const useUrlChannel = () => {
  const { search } = useLocation();
  return useMemo(() => search.substring(1), [search]);
};

const delayedFade = keyframes`
  0% { opacity: 0; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const FadeInContainer = styled.div`
  animation: ${delayedFade} 0.3s ease-in forwards;
  width: 100%;
`;

export function HomePage({
  channel,
  channelData,
  meta,
  onChangeChannel,
  onSendMessage,
  onKickUser,
  onBanUser,
  onIgnoreUser,
  onInviteUser,
  onMuteUser,
  onUnmuteUser,
  onUwuifyUser,
  onLeaveChannel,
  isLocaleModalOpen,
  onCloseLocaleModal,
  onOpenLocaleModal,
  intl,
  connectedTo,
  connectedAccount,
  onDisconnectWallet,
  pendingSignRequest,
  onSignMessageRequest,
  onDoTransfer,
  onClearAuthReqs,
  sessionReady,
  pendingCaptcha,
  pendingPasswordReq,
  cachedLtr,
  /*
  cachedUsername,
  cachedPassword,
  cachedColor,
  cachedDoStore,
  cachedPreviousChannels,
  cachedTheme,
  cachedAllowKatex,
  cachedAllowMarkdown,
  cachedAllowExtCode,
  cachedMenuBtnPos,
  cachedDoHighlight,
  cachedDoAutoconnect,
  cachedWsPath,
  cachedNotifyEnabled,
  */
}) {
  const navigate = useNavigate();
  const channelFromUrl = useUrlChannel();
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);
  const toggleJoinModal = () => setJoinModalOpen(!isJoinModalOpen);
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);

  const [externalUrlToWarn, setExternalUrlToWarn] = useState(null);
  const [suppressLinkWarning, setSuppressLinkWarning] = useState(false);
  const [tempSuppressCheckbox, setTempSuppressCheckbox] = useState(false);

  const [txToWarn, setTxToWarn] = useState(null);
  const [suppressTxWarning, setSuppressTxWarning] = useState(false);
  const [tempSuppressTxCheckbox, setTempSuppressTxCheckbox] = useState(false);

  const [isFocused, setIsFocused] = useState(true);
  const [missedMessages, setMissedMessages] = useState(0);

  const [showSlowWarning, setShowSlowWarning] = useState(false);
  const [showResetButton, setShowResetButton] = useState(false);

  const [challengeCaptcha, setChallengeCaptcha] = useState('');
  const [challengePassword, setChallengePassword] = useState('');
  const captchaInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const currentMessageCount = channelData?.[channel]?.messages?.length || 0;
  const prevMessageCountRef = useRef(currentMessageCount);
  const baseTitle = channelFromUrl ? `?${channelFromUrl}` : 'hack.chat';

  const createOrJoinLabel = intl.formatMessage(messages.createOrJoinLabel);
  const publicChannelsHeader = intl.formatMessage(
    messages.publicChannelsHeader,
  );
  const currentGithub = intl.formatMessage(messages.currentGithub);
  const legacyGithub = intl.formatMessage(messages.legacyGithub);
  const thirdParty = intl.formatMessage(messages.thirdParty);
  const siwText = intl.formatMessage(messages.siwText);
  const siwFinish = intl.formatMessage(messages.siwFinish);
  const cancelText = intl.formatMessage(messages.cancelText);
  const understoodText = intl.formatMessage(messages.understoodText);
  const externalWarningText = intl.formatMessage(messages.externalLinkWarning);
  const suppressWarningMsg = intl.formatMessage(messages.suppressWarningText);
  const txWarningHeader = intl.formatMessage(messages.txWarningHeader);
  const txWarningBody = intl.formatMessage(messages.txWarningBody);
  const txCopy = intl.formatMessage(messages.txCopy);
  const txSignAndSend = intl.formatMessage(messages.txSignAndSend);
  const connectionSlowText = intl.formatMessage(messages.connectionSlowText);

  const joinedChannels = useMemo(
    () => (channelData ? Object.keys(channelData) : []),
    [channelData],
  );

  const chatInputRef = useRef(null);

  const channelUsersRef = useRef({});

  useEffect(() => {
    channelUsersRef.current = channelData?.[channel]?.users || {};
  }, [channelData, channel]);

  useEffect(() => {
    setIsFocused(document.hasFocus());

    const handleFocus = () => {
      setIsFocused(true);
      setMissedMessages(0);
      document.title = baseTitle;
    };
    const handleBlur = () => {
      setIsFocused(false);
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, [baseTitle]);

  useEffect(() => {
    if (!isFocused && currentMessageCount > prevMessageCountRef.current) {
      const diff = currentMessageCount - prevMessageCountRef.current;

      setMissedMessages((prev) => {
        const newMissedCount = prev + diff;
        document.title = `(${newMissedCount}) ${baseTitle}`;

        return newMissedCount;
      });
    }

    prevMessageCountRef.current = currentMessageCount;
  }, [currentMessageCount, isFocused, baseTitle]);

  useEffect(() => {
    setMissedMessages(0);
    prevMessageCountRef.current = channelData?.[channel]?.messages?.length || 0;
  }, [channel]);

  useEffect(() => {
    let warningTimer;
    let resetTimer;

    if (channelFromUrl && !sessionReady) {
      warningTimer = setTimeout(() => setShowSlowWarning(true), 5000);
      resetTimer = setTimeout(() => setShowResetButton(true), 10000);
    } else {
      setShowSlowWarning(false);
      setShowResetButton(false);
    }

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(resetTimer);
    };
  }, [sessionReady, channelFromUrl]);

  const handleExternalLinkClick = useCallback(
    (url) => {
      if (suppressLinkWarning) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        setTempSuppressCheckbox(false);
        setExternalUrlToWarn(url);
      }
    },
    [suppressLinkWarning],
  );

  const handleTxAttemptClick = useCallback(
    (tx) => {
      if (suppressTxWarning) {
        onDoTransfer(tx);
      } else {
        setTempSuppressTxCheckbox(false);
        setTxToWarn(tx);
      }
    },
    [suppressTxWarning, onDoTransfer],
  );

  const handleMenuCommand = useCallback(
    (commandText) => {
      const mentionMatch = commandText.match(/^@\S+\s$/);

      if (mentionMatch) {
        chatInputRef.current?.insertText(
          commandText.substr(0, commandText.length),
        );
        return;
      }

      const kickMatch = commandText.match(/^\/kick @(.+)/);
      const banMatch = commandText.match(/^\/ban @(.+)/);
      const ignoreMatch = commandText.match(/^\/ignore @(.+)/);
      const inviteMatch = commandText.match(/^\/invite @(.+)/);
      const muzzleMatch = commandText.match(/^\/muzzle @(.+)/);
      const unmuzzleMatch = commandText.match(/^\/unmuzzle @(.+)/);
      const uwuifyMatch = commandText.match(/^\/uwuify @(.+)/);

      if (
        kickMatch ||
        banMatch ||
        ignoreMatch ||
        inviteMatch ||
        muzzleMatch ||
        unmuzzleMatch ||
        uwuifyMatch
      ) {
        const username =
          (kickMatch && kickMatch[1]) ||
          (banMatch && banMatch[1]) ||
          (ignoreMatch && ignoreMatch[1]) ||
          (inviteMatch && inviteMatch[1]) ||
          (muzzleMatch && muzzleMatch[1]) ||
          (unmuzzleMatch && unmuzzleMatch[1]) ||
          (uwuifyMatch && uwuifyMatch[1]);

        const users = channelData[channel]?.users;

        if (!users) {
          // eslint-disable-next-line no-console
          console.warn('User list not available for this channel.');
          return;
        }

        const targetUser = Object.values(users).find(
          (u) => u.username === username,
        );

        if (targetUser) {
          if (kickMatch) {
            // eslint-disable-next-line no-console
            console.log(`Kicking user: ${username} (ID: ${targetUser.userid})`);
            onKickUser(channel, targetUser.userid);
          } else if (banMatch) {
            // eslint-disable-next-line no-console
            console.log(`Banning user: ${username} (ID: ${targetUser.userid})`);
            onBanUser(channel, targetUser.userid);
          } else if (ignoreMatch) {
            // eslint-disable-next-line no-console
            console.log(
              `Ignoring user: ${username} (ID: ${targetUser.userid})`,
            );
            onIgnoreUser(channel, targetUser.userid);
          } else if (inviteMatch) {
            // eslint-disable-next-line no-console
            console.log(
              `Inviting user: ${username} (ID: ${targetUser.userid})`,
            );
            onInviteUser(channel, targetUser.userid);
          } else if (muzzleMatch) {
            // eslint-disable-next-line no-console
            console.log(
              `Muzzling user: ${username} (ID: ${targetUser.userid})`,
            );
            onMuteUser(channel, targetUser.userid);
          } else if (unmuzzleMatch) {
            // eslint-disable-next-line no-console
            console.log(
              `Unmuzzling user: ${username} (ID: ${targetUser.userid})`,
            );
            onUnmuteUser(channel, targetUser.userid);
          } else if (uwuifyMatch) {
            // eslint-disable-next-line no-console
            console.log(
              `Uwuifying user: ${username} (ID: ${targetUser.userid})`,
            );
            onUwuifyUser(channel, targetUser.userid);
          }
        } else {
          // eslint-disable-next-line no-console
          console.warn(`Could not find user "${username}" to perform action.`);
          chatInputRef.current?.setCommand(commandText);
        }
        return;
      }

      chatInputRef.current?.setCommand(commandText);
    },
    [
      channel,
      onKickUser,
      onBanUser,
      onIgnoreUser,
      onInviteUser,
      onMuteUser,
      onUnmuteUser,
      onUwuifyUser,
    ],
  );

  useEffect(() => {
    if (!sessionReady) return;

    if (pendingCaptcha || pendingPasswordReq) {
      setJoinModalOpen(false);
      return;
    }

    if (channelFromUrl) {
      const isAlreadyMember = channelData && channelData[channelFromUrl];

      if (isAlreadyMember) {
        if (channel !== channelFromUrl) {
          onChangeChannel(channelFromUrl);
        }
        setJoinModalOpen(false);
      } else {
        setJoinModalOpen(true);
      }
    } else {
      if (channel) {
        navigate(`/?${channel}`, { replace: true });
      }
    }
  }, [
    channelFromUrl,
    channel,
    channelData,
    onChangeChannel,
    navigate,
    sessionReady,
    pendingCaptcha,
    pendingPasswordReq,
  ]);

  useEffect(() => {
    if (pendingCaptcha && captchaInputRef.current) {
      setTimeout(() => captchaInputRef.current.focus(), 100);
    }
  }, [pendingCaptcha]);

  useEffect(() => {
    if (pendingPasswordReq && passwordInputRef.current) {
      setTimeout(() => passwordInputRef.current.focus(), 100);
    }
  }, [pendingPasswordReq]);

  const handleCopyTx = async () => {
    if (txToWarn) {
      try {
        await navigator.clipboard.writeText(txToWarn);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to copy transaction', err);
      }
    }
  };

  const publicChannels = useMemo(() => {
    const sortedChannels = [...meta.channels].sort((a, b) => b.count - a.count);
    const channelPairs = [];
    for (let i = 0; i < sortedChannels.length; i += 2) {
      channelPairs.push(sortedChannels.slice(i, i + 2));
    }
    return channelPairs.map(([ch1, ch2]) => {
      const key = ch1 ? `pchan-${ch1.name}` : `pchan-empty-${Math.random()}`;
      return (
        <ChannelRow key={key}>
          <div>
            {ch1 && (
              <Link to={`/?${DOMPurify.sanitize(ch1.name)}`}>
                ?{DOMPurify.sanitize(ch1.name)}: {ch1.count}
              </Link>
            )}
          </div>
          <div>
            {ch2 && (
              <Link to={`/?${DOMPurify.sanitize(ch2.name)}`}>
                ?{DOMPurify.sanitize(ch2.name)}: {ch2.count}
              </Link>
            )}
          </div>
        </ChannelRow>
      );
    });
  }, [meta.channels]);

  const showChat = Boolean(
    sessionReady &&
    channel &&
    channel === channelFromUrl &&
    channelData &&
    channelData[channelFromUrl],
  );

  let homepageTitle = baseTitle;
  if (missedMessages > 0) {
    homepageTitle = `(${missedMessages}) ${baseTitle}`;
  }

  const HomePageContent = (
    <FadeInContainer>
      <Center>
        <Banner>
          {`
 _           _         _        _
| |_ ___ ___| |_   ___| |_ ___ | |_
|   |_ ||  _| '_| |  _|   |_  ||  _|
|_|_|__/|___|_,_|.|___|_|_|__/ |_|
        `}
        </Banner>
      </Center>
      <Center>
        <ChannelButton
          onClick={() => setJoinModalOpen(true)}
          disabled={!sessionReady}
          style={{
            opacity: !sessionReady ? 0.5 : 1,
            cursor: !sessionReady ? 'not-allowed' : 'pointer',
          }}
        >
          {createOrJoinLabel}
        </ChannelButton>
      </Center>
      <ChannelList
        channels={joinedChannels}
        onLeaveChannel={(ch) => onLeaveChannel(ch)}
      />
      <br />
      <Center>{publicChannelsHeader}</Center>
      {publicChannels.length === 0 ? <LoadingIndicator /> : publicChannels}
      <Center>
        <Socials>
          <Link
            to="https://www.markdownguide.org/cheat-sheet/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaMarkdown />
          </Link>
          <Link
            to="https://katex.org/docs/supported"
            rel="noopener noreferrer"
            target="_blank"
          >
            <SiLatex />
          </Link>
          <Link
            to="https://highlightjs.org/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaFileCode />
          </Link>
          <Link
            to="https://github.com/hack-chat"
            rel="noopener noreferrer"
            target="_blank"
            title={currentGithub}
          >
            <FaGithub />
          </Link>
          <Link
            to="https://github.com/AndrewBelt/hack.chat"
            rel="noopener noreferrer"
            target="_blank"
            title={legacyGithub}
          >
            <FaGithub />
          </Link>
          <Link
            to="https://github.com/hack-chat/3rd-party-software-list"
            rel="noopener noreferrer"
            target="_blank"
            title={thirdParty}
          >
            <FaGithub />
          </Link>
        </Socials>
      </Center>
    </FadeInContainer>
  );

  return (
    <MainContainer>
      <Helmet>
        <title>{homepageTitle}</title>
        <meta
          name="description"
          content="a minimal, distraction-free chat application"
        />
      </Helmet>

      {sessionReady && channel && (
        <MainMenu
          channel={channel}
          channelData={channelData}
          onJoinOrCreateClick={toggleJoinModal}
          onCommandClick={handleMenuCommand}
          onOpenLocaleModal={onOpenLocaleModal}
          onOpenWalletModal={() => setWalletModalOpen(true)}
          isWalletConnected={!!connectedTo}
          walletAddress={connectedAccount ? connectedAccount.address : ''}
          onDisconnectWallet={onDisconnectWallet}
          onLeaveChannel={onLeaveChannel}
        />
      )}

      {showChat ? (
        <ChatLayout dir={cachedLtr ? 'ltr' : 'rtl'}>
          <ChatManager
            channel={channel}
            channelData={channelData}
            handleMenuCommand={handleMenuCommand}
            onExternalLinkClick={handleExternalLinkClick}
            onTxAttemptClick={handleTxAttemptClick}
            intl={intl}
          />
          <ChatInput
            channel={channel}
            users={channelData?.[channel]?.users}
            onSendMessage={onSendMessage}
            ref={chatInputRef}
          />
        </ChatLayout>
      ) : (
        <LandingPageContents>
          {!!channelFromUrl && !sessionReady ? (
            <Center
              style={{
                flexDirection: 'column',
                gap: '1rem',
                marginTop: '2rem',
              }}
            >
              <LoadingIndicator />
              {showSlowWarning && (
                <div
                  style={{
                    marginTop: '1rem',
                    opacity: 0.8,
                    textAlign: 'center',
                  }}
                >
                  {connectionSlowText}
                </div>
              )}
              {showResetButton && (
                <ResetButton
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  🧽✨🔄
                </ResetButton>
              )}
            </Center>
          ) : isJoinModalOpen && !!channelFromUrl ? null : (
            HomePageContent
          )}
        </LandingPageContents>
      )}

      <Modal isOpen={isJoinModalOpen} doToggle={setJoinModalOpen}>
        <JoinMenu
          doToggle={toggleJoinModal}
          qString={!showChat ? channelFromUrl : ''}
        />
      </Modal>

      <Modal isOpen={isLocaleModalOpen} doToggle={onCloseLocaleModal}>
        <LocaleModal />
      </Modal>

      <Modal isOpen={!!pendingSignRequest} doToggle={() => {}}>
        <Center>{siwText}</Center>
        <Center>
          <ChannelButton
            onClick={() =>
              onSignMessageRequest(
                pendingSignRequest.wallet,
                pendingSignRequest.message,
              )
            }
          >
            {siwFinish}
          </ChannelButton>
        </Center>
      </Modal>

      <Modal
        isOpen={!!externalUrlToWarn}
        doToggle={() => setExternalUrlToWarn(null)}
      >
        <ModalHeader>{externalWarningText}</ModalHeader>

        <ModalBody>
          <a href={externalUrlToWarn} target="_blank" rel="noopener noreferrer">
            {externalUrlToWarn}
          </a>
        </ModalBody>

        <Center>
          <ModalLabel>
            <input
              type="checkbox"
              checked={tempSuppressCheckbox}
              onChange={(e) => setTempSuppressCheckbox(e.target.checked)}
            />
            {suppressWarningMsg}
          </ModalLabel>
        </Center>

        <ModalActions>
          <ChannelButton onClick={() => setExternalUrlToWarn(null)}>
            {cancelText}
          </ChannelButton>
          <ChannelButton
            onClick={() => {
              if (tempSuppressCheckbox) {
                setSuppressLinkWarning(true);
              }
              window.open(externalUrlToWarn, '_blank', 'noopener,noreferrer');
              setExternalUrlToWarn(null);
            }}
          >
            {understoodText}
          </ChannelButton>
        </ModalActions>
      </Modal>

      <Modal isOpen={!!txToWarn} doToggle={() => setTxToWarn(null)}>
        <ModalHeader>{txWarningHeader}</ModalHeader>

        <ModalBody>{txWarningBody}</ModalBody>

        <CodeBox>
          <CodeText>{txToWarn}</CodeText>
          <CodeAction onClick={handleCopyTx} title={txCopy}>
            {txCopy}
          </CodeAction>
        </CodeBox>

        <Center>
          <ModalLabel>
            <input
              type="checkbox"
              checked={tempSuppressTxCheckbox}
              onChange={(e) => setTempSuppressTxCheckbox(e.target.checked)}
            />
            {suppressWarningMsg}
          </ModalLabel>
        </Center>

        <ModalActions>
          <ChannelButton onClick={() => setTxToWarn(null)}>
            {cancelText}
          </ChannelButton>
          <ChannelButton
            onClick={() => {
              if (tempSuppressTxCheckbox) {
                setSuppressTxWarning(true);
              }
              onDoTransfer(txToWarn);
              setTxToWarn(null);
            }}
          >
            {txSignAndSend}
          </ChannelButton>
        </ModalActions>
      </Modal>

      <Modal isOpen={!!pendingCaptcha} doToggle={onClearAuthReqs}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (challengeCaptcha.trim() !== '') {
              onSendMessage(pendingCaptcha.channel, challengeCaptcha.trim());
              setChallengeCaptcha('');
              onClearAuthReqs();
            }
          }}
        >
          <ModalHeader style={{ textAlign: 'center', fontSize: '1.5rem' }}>
            🛡️ ?{pendingCaptcha?.channel} 🤖
          </ModalHeader>
          <ModalBody>
            <CaptchaText>{pendingCaptcha?.text}</CaptchaText>
          </ModalBody>
          <Center>
            <input
              ref={captchaInputRef}
              type="text"
              autoComplete="off"
              placeholder="🔤 . . ."
              value={challengeCaptcha}
              onChange={(e) => setChallengeCaptcha(e.target.value)}
              style={{
                padding: '0.5rem',
                width: '80%',
                margin: '1rem 0 2rem 0',
                fontFamily: 'monospace',
                textAlign: 'center',
                fontSize: '1.25rem',
              }}
            />
          </Center>
          <input type="submit" style={{ display: 'none' }} />
        </form>
      </Modal>

      <Modal isOpen={!!pendingPasswordReq} doToggle={onClearAuthReqs}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (challengePassword !== '') {
              onSendMessage(pendingPasswordReq.channel, challengePassword);
              setChallengePassword('');
              onClearAuthReqs();
            }
          }}
        >
          <ModalHeader style={{ textAlign: 'center', fontSize: '1.5rem' }}>
            🔐 ?{pendingPasswordReq?.channel} ❗
          </ModalHeader>

          <Center>
            <input
              type="text"
              autoComplete="username"
              value="room_guest"
              style={{ display: 'none' }}
              readOnly
            />

            <input
              ref={passwordInputRef}
              type="password"
              autoComplete="current-password"
              placeholder="🗝️ . . ."
              value={challengePassword}
              onChange={(e) => setChallengePassword(e.target.value)}
              style={{
                padding: '0.5rem',
                width: '80%',
                margin: '2rem 0',
                fontFamily: 'monospace',
                textAlign: 'center',
                fontSize: '1.25rem',
              }}
            />
          </Center>
          <input type="submit" style={{ display: 'none' }} />
        </form>
      </Modal>

      <WalletMenu isOpen={isWalletModalOpen} doToggle={setWalletModalOpen} />
    </MainContainer>
  );
}

HomePage.propTypes = {
  channel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  channelData: PropTypes.object,
  meta: PropTypes.object,
  onChangeChannel: PropTypes.func,
  onSendMessage: PropTypes.func,
  onKickUser: PropTypes.func,
  onBanUser: PropTypes.func,
  onIgnoreUser: PropTypes.func,
  onInviteUser: PropTypes.func,
  onMuteUser: PropTypes.func,
  onUnmuteUser: PropTypes.func,
  onUwuifyUser: PropTypes.func,
  onLeaveChannel: PropTypes.func,
  isLocaleModalOpen: PropTypes.bool,
  onCloseLocaleModal: PropTypes.func,
  onOpenLocaleModal: PropTypes.func,
  intl: PropTypes.object.isRequired,
  connectedTo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  connectedAccount: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onDisconnectWallet: PropTypes.func,
  pendingSignRequest: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onSignMessageRequest: PropTypes.func,
  sessionReady: PropTypes.bool,
  pendingCaptcha: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  pendingPasswordReq: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onDoTransfer: PropTypes.func,
  onClearAuthReqs: PropTypes.func,
  onClearChannel: PropTypes.func,
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
};

const mapStateToProps = createStructuredSelector({
  channel: makeSelectChannel(),
  channelData: makeSelectChannelData(),
  meta: makeSelectMeta(),
  isLocaleModalOpen: makeSelectIsLocaleModalOpen(),
  connectedTo: makeSelectConnectedTo(),
  connectedAccount: makeSelectConnectedAccount(),
  pendingSignRequest: makeSelectPendingSignRequest(),
  sessionReady: makeSelectSessionReady(),
  pendingCaptcha: makeSelectPendingCaptcha(),
  pendingPasswordReq: makeSelectPendingPasswordReq(),
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
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeChannel: (channelName) => dispatch(changeChannel(channelName)),
    onSendMessage: (channel, message) => {
      // bet there is a better spot for these. . .
      if (message.trim() === '/leave') {
        dispatch(leaveChannel(channel));
      } else if (message.trim() === '/clear') {
        dispatch(clearChannel(channel));
      } else {
        dispatch(sendChat(channel, message));
      }
    },
    onClearChannel: (channel) => dispatch(clearChannel(channel)),
    onKickUser: (channel, user) => dispatch(kickUser(channel, user)),
    onBanUser: (channel, user) => dispatch(banUser(channel, user)),
    onIgnoreUser: (channel, userid) => dispatch(ignoreUser(channel, userid)),
    onInviteUser: (channel, userid) => dispatch(inviteUser(channel, userid)),
    onMuteUser: (channel, user) => dispatch(muteUser(channel, user)),
    onUnmuteUser: (channel, user) => dispatch(unmuteUser(channel, user)),
    onUwuifyUser: (channel, user) => dispatch(uwuifyUser(channel, user)),
    onLeaveChannel: (channel) => dispatch(leaveChannel(channel)),
    onCloseLocaleModal: () => dispatch(closeLocaleModal()),
    onOpenLocaleModal: () => dispatch(openLocaleModal()),
    onDisconnectWallet: () => dispatch(disconnectWallet()),
    onSignMessageRequest: (wallet, message) =>
      dispatch(signMessageRequest(wallet, message)),
    onDoTransfer: (tx) => dispatch(doTransfer(tx)),
    onClearAuthReqs: () => dispatch(clearAuthReqs()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl, memo)(HomePage);
