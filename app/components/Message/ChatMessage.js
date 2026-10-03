/**
 * Normal chat messages rendering
 */

import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectSettingsPageDomain } from '../../containers/SettingsPage/selectors';
import messages from './messages';

import MessageContainer from './MessageContainer';
import MessageContent from './MessageContent';
import ExtendedMessageContent from './ExtendedMessageContent';
import NickPlaceholder from './NickPlaceholder';
import ChatStyle from './ChatStyle';
import ExpandButton from './ExpandButton';
import Nick from './Nick';

const TRUNCATION_CHAR_THRESHOLD = 450;

const ChatMessage = ({
  handleMention,
  handleContextMenu,
  onMessageClick,
  onMessageContextMenu,
  extended,
  user,
  payload,
  msgForm,
  intl,
  hasBackground,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongMessage = payload.content.length > TRUNCATION_CHAR_THRESHOLD;
  const ContentWrapper = extended ? ExtendedMessageContent : MessageContent;

  const renderedContent = useMemo(
    () => msgForm.render(payload.content),
    [msgForm, payload.content],
  );

  const doHighlight = useSelector(
    (state) => selectSettingsPageDomain(state).highlightMentions ?? true,
  );

  const myUsername = useSelector(
    (state) => selectSettingsPageDomain(state).username ?? '',
  );

  let isMentioned = false;
  if (doHighlight && myUsername && payload.content) {
    const escapedName = myUsername.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const mentionRegex = new RegExp(
      `(^|\\s|\\W)@${escapedName}($|\\s|\\W)`,
      'i',
    );
    isMentioned = mentionRegex.test(payload.content);
  }

  const handleChatClick = (e) => {
    if (
      e.target.closest('a') ||
      e.target.closest('button') ||
      window.getSelection().toString().length > 0
    ) {
      return;
    }
    if (onMessageClick) {
      onMessageClick(payload, user);
    }
  };

  const handleChatRightClick = (e) => {
    if (e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    if (onMessageContextMenu) {
      onMessageContextMenu(payload, user, e);
    }
  };

  return (
    <MessageContainer>
      {!extended ? (
        <Nick
          handleMention={handleMention}
          handleContextMenu={handleContextMenu}
          user={user}
          time={payload.time}
        />
      ) : (
        <NickPlaceholder />
      )}
      <ContentWrapper $hasBackground={hasBackground} $isMentioned={isMentioned}>
        <ChatStyle
          $canExpand={isLongMessage}
          $isExpanded={isExpanded}
          onClick={handleChatClick}
          onContextMenu={handleChatRightClick}
        >
          {renderedContent}
        </ChatStyle>
        {isLongMessage && (
          <ExpandButton onClick={() => setIsExpanded((prev) => !prev)}>
            {isExpanded
              ? intl.formatMessage(messages.showLess)
              : intl.formatMessage(messages.showMore)}
          </ExpandButton>
        )}
      </ContentWrapper>
    </MessageContainer>
  );
};

ChatMessage.propTypes = {
  extended: PropTypes.bool,
  user: PropTypes.object,
  payload: PropTypes.object,
  msgForm: PropTypes.object,
  intl: PropTypes.object.isRequired,
  hasBackground: PropTypes.bool,
  handleMention: PropTypes.func,
  handleContextMenu: PropTypes.func,
  onMessageClick: PropTypes.func,
  onMessageContextMenu: PropTypes.func,
};

export default ChatMessage;
