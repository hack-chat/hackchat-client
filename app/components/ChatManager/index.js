/**
 * ChatManager displays the list of messages for a channel.
 */

import React, {
  useEffect,
  useRef,
  useMemo,
  useState,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';

import { Message } from 'components/Message';
import MessageFormatter from 'components/MessageFormatter';
import UserContextMenu from 'components/UserContextMenu';
import MessageContextMenu from 'components/MessageContextMenu';

import Wrapper from './Wrapper';
import messages from './messages';

const EMPTY_USER = {};

export function ChatManager({
  channel,
  channelData,
  handleMenuCommand,
  handleInsertText,
  onExternalLinkClick,
  onTxAttemptClick,
  intl,
}) {
  const scrollContainerRef = useRef(null);
  const isAtBottomRef = useRef(true);

  const [contextMenu, setContextMenu] = useState(null);
  const [messageContextMenu, setMessageContextMenu] = useState(null);

  const currentChannelData = useMemo(
    () => (channelData && channelData[channel]) || { users: [], messages: [] },
    [channelData, channel],
  );

  useEffect(() => {
    isAtBottomRef.current = true;
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [channel]);

  useEffect(() => {
    if (scrollContainerRef.current && isAtBottomRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [currentChannelData.messages.length]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      isAtBottomRef.current = distanceFromBottom < 150;
    }
  };

  const handleChatClick = (e) => {
    const linkTarget = e.target.closest('a');

    if (
      linkTarget &&
      linkTarget.getAttribute('target') === '_blank' &&
      linkTarget.href
    ) {
      e.preventDefault();
      if (onExternalLinkClick) {
        onExternalLinkClick(linkTarget.href);
      }
    }
  };

  const handleUserContextMenu = useCallback((user, event) => {
    event.preventDefault();
    setContextMenu({
      user,
      x: event.clientX,
      y: event.clientY,
    });
  }, []);

  const closeUserContextMenu = () => {
    setContextMenu(null);
  };

  const handleMessageLeftClick = useCallback(
    (payload, user) => {
      const username = user.username || payload.name || 'unknown';
      const quoteText = payload.content
        .split('\n')
        .map((line) => `> ${line}`)
        .join('\n');
      const mention = user.mine ? '' : `@${username} `;
      const replyString = `${quoteText}\n\n${mention}`;

      if (handleInsertText) {
        handleInsertText(replyString);
      }
    },
    [handleInsertText],
  );

  const handleMessageContextMenu = useCallback((payload, user, event) => {
    event.preventDefault();
    setMessageContextMenu({
      payload,
      user,
      x: event.clientX,
      y: event.clientY,
    });
  }, []);

  const closeMessageContextMenu = () => {
    setMessageContextMenu(null);
  };

  const handleMessageMenuAction = (command, payload, user) => {
    if (command === 'reply') {
      handleMessageLeftClick(payload, user);
    } else if (command === 'edit' && payload.id) {
      handleMenuCommand(`/edit ${payload.id} ${payload.content}`);
    }
  };

  const users = useMemo(() => {
    const onlineUsers = Object.values(currentChannelData.users)
      .filter((user) => user.online)
      .map((user) => user.username);

    if (onlineUsers.length <= 1) {
      return intl.formatMessage(messages.aloneMsg);
    }

    return `${intl.formatMessage(
      messages.onlineUsersText,
    )} ${onlineUsers.join(', ')}`;
  }, [currentChannelData.users, intl]);

  const welcomeMessage = useMemo(
    () => (
      <Message
        key="welcome-message"
        msgForm={MessageFormatter}
        handleMention={() => {}}
        extended={false}
        type="welcome"
        payload={`${intl.formatMessage(
          messages.currentChannel,
        )} "${channel}". ${users}`}
        user={{}}
        intl={intl}
      />
    ),
    [channel, users, intl],
  );

  const messageElements = useMemo(() => {
    let lastUserId = null;
    let stripe = false;

    return currentChannelData.messages.map((msg, index, allMessages) => {
      const currentUserId = msg.data.userid || (msg.user && msg.user.userid);
      const user = currentUserId
        ? currentChannelData.users[currentUserId] || msg.user || EMPTY_USER
        : msg.user || EMPTY_USER;

      const previousMsg = allMessages[index - 1];
      const previousUserId = previousMsg
        ? previousMsg.data.userid ||
          (previousMsg.user && previousMsg.user.userid)
        : null;

      const isExtended =
        previousMsg &&
        previousMsg.type === 'chat' &&
        msg.type === 'chat' &&
        previousUserId === currentUserId;

      if (currentUserId && currentUserId !== lastUserId) {
        stripe = !stripe;
        lastUserId = currentUserId;
      }

      return (
        <Message
          key={`msg-${index}`}
          msgForm={MessageFormatter}
          handleMention={handleMenuCommand}
          handleContextMenu={handleUserContextMenu}
          onMessageClick={handleMessageLeftClick}
          onMessageContextMenu={handleMessageContextMenu}
          extended={isExtended}
          type={msg.type}
          payload={msg.data}
          user={user}
          intl={intl}
          hasBackground={stripe}
          onTxAttemptClick={onTxAttemptClick}
        />
      );
    });
  }, [currentChannelData.messages, currentChannelData.users, intl]);

  const myPermissionLevel = useMemo(() => {
    const me = Object.values(currentChannelData.users).find(
      (user) => user.mine,
    );
    return me ? me.permissionLevel : 0;
  }, [currentChannelData.users]);

  return (
    <Wrapper
      ref={scrollContainerRef}
      onScroll={handleScroll}
      onClick={handleChatClick}
    >
      {welcomeMessage}
      {messageElements}

      <UserContextMenu
        contextMenu={contextMenu}
        closeContextMenu={closeUserContextMenu}
        onCommandClick={handleMenuCommand}
        myPermissionLevel={myPermissionLevel}
      />

      <MessageContextMenu
        contextMenu={messageContextMenu}
        closeContextMenu={closeMessageContextMenu}
        onCommandClick={handleMessageMenuAction}
      />
    </Wrapper>
  );
}

ChatManager.propTypes = {
  channel: PropTypes.string,
  channelData: PropTypes.object,
  handleMenuCommand: PropTypes.func,
  handleInsertText: PropTypes.func,
  onExternalLinkClick: PropTypes.func,
  intl: PropTypes.object.isRequired,
  onTxAttemptClick: PropTypes.func,
};

export default compose(injectIntl)(ChatManager);
