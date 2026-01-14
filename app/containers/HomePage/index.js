/**
 * HomePage will
 */

import React, { useEffect, useMemo, useState, memo, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import DOMPurify from 'dompurify';

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
} from 'containers/CommunicationProvider/actions';
import {
  makeSelectChannel,
  makeSelectChannelData,
  makeSelectMeta,
  makeSelectSessionReady,
} from 'containers/CommunicationProvider/selectors';

import { makeSelectIsLocaleModalOpen } from 'containers/LanguageProvider/selectors';
import {
  closeLocaleModal,
  openLocaleModal,
} from 'containers/LanguageProvider/actions';

import {
  disconnectWallet,
  signMessageRequest,
} from 'containers/WalletLayer/actions';
import {
  makeSelectConnectedTo,
  makeSelectConnectedAccount,
  makeSelectPendingSignRequest,
} from 'containers/WalletLayer/selectors';

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

const useUrlChannel = () => {
  const { search } = useLocation();
  return useMemo(() => search.substring(1), [search]);
};

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
  sessionReady,
}) {
  const navigate = useNavigate();
  const channelFromUrl = useUrlChannel();
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);
  const toggleJoinModal = () => setJoinModalOpen(!isJoinModalOpen);
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);

  const createOrJoinLabel = intl.formatMessage(messages.createOrJoinLabel);
  const publicChannelsHeader = intl.formatMessage(
    messages.publicChannelsHeader,
  );
  const currentGithub = intl.formatMessage(messages.currentGithub);
  const legacyGithub = intl.formatMessage(messages.legacyGithub);
  const thirdParty = intl.formatMessage(messages.thirdParty);
  const siwText = intl.formatMessage(messages.siwText);
  const siwFinish = intl.formatMessage(messages.siwFinish);

  const joinedChannels = useMemo(
    () => (channelData ? Object.keys(channelData) : []),
    [channelData],
  );

  const chatInputRef = useRef(null);

  const handleMenuCommand = (commandText) => {
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
          console.log(`Ignoring user: ${username} (ID: ${targetUser.userid})`);
          onIgnoreUser(channel, targetUser.userid);
        } else if (inviteMatch) {
          // eslint-disable-next-line no-console
          console.log(`Inviting user: ${username} (ID: ${targetUser.userid})`);
          onInviteUser(channel, targetUser.userid);
        } else if (muzzleMatch) {
          // eslint-disable-next-line no-console
          console.log(`Muzzling user: ${username} (ID: ${targetUser.userid})`);
          onMuteUser(channel, targetUser.userid);
        } else if (unmuzzleMatch) {
          // eslint-disable-next-line no-console
          console.log(
            `Unmuzzling user: ${username} (ID: ${targetUser.userid})`,
          );
          onUnmuteUser(channel, targetUser.userid);
        } else if (uwuifyMatch) {
          // eslint-disable-next-line no-console
          console.log(`Uwuifying user: ${username} (ID: ${targetUser.userid})`);
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
  };

  useEffect(() => {
    if (!sessionReady) return;

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
  ]);

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

  const showChat = sessionReady && channel && channel === channelFromUrl;
  const homepageTitle = channelFromUrl || 'hack.chat';

  const HomePageContent = (
    <>
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
    </>
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

      {showChat && (
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
        />
      )}

      {showChat ? (
        <ChatLayout>
          <ChatManager
            channel={channel}
            channelData={channelData}
            handleMenuCommand={handleMenuCommand}
            intl={intl}
          />
          <ChatInput
            channel={channel}
            onSendMessage={onSendMessage}
            ref={chatInputRef}
          />
        </ChatLayout>
      ) : (
        <LandingPageContents>
          {!!channelFromUrl && !sessionReady ? (
            <LoadingIndicator />
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
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeChannel: (channelName) => dispatch(changeChannel(channelName)),
    onSendMessage: (channel, message) => {
      // bet there is a better spot for this. . .
      if (message.trim() === '/leave') {
        dispatch(leaveChannel(channel));
      } else {
        dispatch(sendChat(channel, message));
      }
    },
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
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl, memo)(HomePage);
