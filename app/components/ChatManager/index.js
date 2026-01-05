/**
 * ChatManager displays the list of messages for a channel.
 */

import React, { useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';

import { Message } from 'components/Message';
import MessageFormatter from 'components/MessageFormatter';

import { ChatWrapper } from './Wrapper';
import messages from './messages';

export function ChatManager({ channel, channelData, handleMenuCommand, intl }) {
  const scrollContainerRef = useRef(null);
  const isAtBottomRef = useRef(true);

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
      const user =
        typeof msg.data.userid !== 'undefined'
          ? currentChannelData.users[msg.data.userid]
          : {};

      const previousMsg = allMessages[index - 1];

      const isExtended =
        previousMsg &&
        previousMsg.type === 'chat' &&
        msg.type === 'chat' &&
        previousMsg.data.userid === msg.data.userid;

      const currentUserId = msg.data.userid;
      if (currentUserId && currentUserId !== lastUserId) {
        stripe = !stripe;
        lastUserId = currentUserId;
      }

      return (
        <Message
          key={`msg-${index}`}
          msgForm={MessageFormatter}
          handleMention={handleMenuCommand}
          extended={isExtended}
          type={msg.type}
          payload={msg.data}
          user={user}
          intl={intl}
          hasBackground={stripe}
        />
      );
    });
  }, [currentChannelData.messages, currentChannelData.users, intl]);

  return (
    <ChatWrapper ref={scrollContainerRef} onScroll={handleScroll}>
      {welcomeMessage}
      {messageElements}
    </ChatWrapper>
  );
}

ChatManager.propTypes = {
  channel: PropTypes.string,
  channelData: PropTypes.object,
  intl: PropTypes.object.isRequired,
};

export default compose(injectIntl)(ChatManager);
