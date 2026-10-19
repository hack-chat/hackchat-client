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
import { Virtuoso } from 'react-virtuoso';

import { Message } from 'components/Message';
import MessageFormatter from 'components/MessageFormatter';
import UserContextMenu from 'components/UserContextMenu';
import MessageContextMenu from 'components/MessageContextMenu';

import messages from './messages';

import ChatFooter from './ChatFooter';
import Wrapper from './Wrapper';

const EMPTY_USER = {};

export function ChatManager({
  channel,
  channelData,
  handleMenuCommand,
  handleInsertText,
  onExternalLinkClick,
  onTxAttemptClick,
  intl,
  externalScrollRef,
  isWalletConnected,
  largeMode,
  isActive,
}) {
  const virtuosoRef = useRef(null);
  const isAtBottomRef = useRef(true);
  const welcomeTextRef = useRef(null);

  const [contextMenu, setContextMenu] = useState(null);
  const [messageContextMenu, setMessageContextMenu] = useState(null);

  const currentChannelData = useMemo(
    () => (channelData && channelData[channel]) || { users: [], messages: [] },
    [channelData, channel],
  );

  useEffect(() => {
    const wasAtBottom = isAtBottomRef.current;

    if (wasAtBottom && virtuosoRef.current) {
      setTimeout(() => {
        if (virtuosoRef.current) {
          virtuosoRef.current.scrollToIndex({
            index: enrichedMessages.length - 1,
            align: 'end',
            behavior: 'smooth',
          });
        }
      }, 50);
    }
  }, [enrichedMessages]);

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
    if (user && user.mine) return;

    const selection = window.getSelection();
    if (
      selection &&
      !selection.isCollapsed &&
      selection.containsNode(event.target, true)
    ) {
      return;
    }

    event.preventDefault();
    setContextMenu({ user, x: event.clientX, y: event.clientY });
  }, []);

  const closeUserContextMenu = () => setContextMenu(null);

  const handleMessageLeftClick = useCallback(
    (payload, user) => {
      const username = user.username || payload.name || 'unknown';
      const prefix = user.mine ? '> ' : `> @${username}: `;

      const quoteText = payload.content
        .split('\n')
        .map((line, index) => (index === 0 ? `${prefix}${line}` : `> ${line}`))
        .join('\n');

      const replyString = `${quoteText}\n\n`;

      if (handleInsertText) {
        handleInsertText(replyString);
      }
    },
    [handleInsertText],
  );

  const handleMessageContextMenu = useCallback((payload, user, event) => {
    const selection = window.getSelection();
    if (
      selection &&
      !selection.isCollapsed &&
      selection.containsNode(event.target, true)
    ) {
      return;
    }

    event.preventDefault();
    setMessageContextMenu({
      payload,
      user,
      x: event.clientX,
      y: event.clientY,
    });
  }, []);

  const closeMessageContextMenu = () => setMessageContextMenu(null);

  const handleMessageMenuAction = (command, payload, user) => {
    if (command === 'reply') {
      handleMessageLeftClick(payload, user);
    } else if (command === 'edit' && payload.id) {
      handleMenuCommand(`/edit ${payload.id} ${payload.content}`);
    }
  };

  const staticWelcomeText = useMemo(() => {
    if (welcomeTextRef.current) return welcomeTextRef.current;

    const onlineUsers = Object.values(currentChannelData.users)
      .filter((user) => user.online)
      .map((user) => user.username);

    if (onlineUsers.length === 0) {
      return `${intl.formatMessage(messages.currentChannel)} "${channel}"...`;
    }

    const usersString =
      onlineUsers.length <= 1
        ? intl.formatMessage(messages.aloneMsg)
        : `${intl.formatMessage(messages.onlineUsersText)} ${onlineUsers.join(', ')}`;

    const compiledText = `${intl.formatMessage(
      messages.currentChannel,
    )} "${channel}". ${usersString}`;

    welcomeTextRef.current = compiledText;

    return compiledText;
  }, [currentChannelData.users, channel, intl]);

  const enrichedMessages = useMemo(() => {
    let lastUserId = null;
    let stripe = false;

    const mappedMessages = currentChannelData.messages.map(
      (msg, index, allMessages) => {
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

        return {
          ...msg,
          computedUser: user,
          isExtended,
          stripe,
        };
      },
    );

    const welcomeMessageObj = {
      type: 'welcome',
      data: staticWelcomeText,
      computedUser: EMPTY_USER,
      isExtended: false,
      stripe: false,
    };

    return [welcomeMessageObj, ...mappedMessages];
  }, [
    currentChannelData.messages,
    currentChannelData.users,
    staticWelcomeText,
  ]);

  const myPermissionLevel = useMemo(() => {
    const me = Object.values(currentChannelData.users).find(
      (user) => user.mine,
    );
    return me ? me.permissionLevel : 0;
  }, [currentChannelData.users]);

  const lastMessage = enrichedMessages[enrichedMessages.length - 1];

  const virtuosoContext = useMemo(
    () => ({
      stripe: lastMessage ? lastMessage.stripe : false,
      isMentioned: false,
      largeMode,
    }),
    [lastMessage, largeMode],
  );

  const virtuosoComponents = useMemo(
    () => ({
      Footer: ({ context }) => (
        <ChatFooter
          $hasBackground={context?.stripe}
          $isMentioned={context?.isMentioned}
          $largeMode={context?.largeMode}
        />
      ),
    }),
    [],
  );

  return (
    <Wrapper
      key={channel}
      translate="no"
      className="notranslate chat-log"
      onClick={handleChatClick}
      style={{ display: isActive ? 'flex' : 'none' }}
    >
      <Virtuoso
        ref={virtuosoRef}
        scrollerRef={(element) => {
          if (externalScrollRef) {
            externalScrollRef.current = element;
          }
        }}
        data={enrichedMessages}
        style={{ flex: 1 }}
        alignToBottom={false}
        followOutput={(isAtBottom) => (isAtBottom ? 'auto' : false)}
        atBottomThreshold={50}
        atBottomStateChange={(atBottom) => {
          isAtBottomRef.current = atBottom;
        }}
        initialTopMostItemIndex={enrichedMessages.length - 1}
        context={virtuosoContext}
        components={virtuosoComponents}
        itemContent={(index, msg) => (
          <Message
            msgForm={MessageFormatter}
            handleMention={handleMenuCommand}
            handleContextMenu={handleUserContextMenu}
            onMessageClick={handleMessageLeftClick}
            onMessageContextMenu={handleMessageContextMenu}
            extended={msg.isExtended}
            type={msg.type}
            payload={msg.data}
            user={msg.computedUser}
            intl={intl}
            hasBackground={msg.stripe}
            onTxAttemptClick={onTxAttemptClick}
          />
        )}
      />

      <UserContextMenu
        contextMenu={contextMenu}
        closeContextMenu={closeUserContextMenu}
        onCommandClick={handleMenuCommand}
        myPermissionLevel={myPermissionLevel}
        isWalletConnected={isWalletConnected}
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
  isWalletConnected: PropTypes.bool,
  largeMode: PropTypes.bool,
  externalScrollRef: PropTypes.object,
  isActive: PropTypes.bool,
};

export default compose(injectIntl)(ChatManager);
