/**
 * Message exports the UI for a child element of the ChatManager,
 * dispatching to the correct sub-component based on message type.
 */
import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import styled from 'styled-components';

import { selectSettingsPageDomain } from '../../containers/SettingsPage/selectors';

import messages, { ERROR_ID } from './messages';

// Import all layout and style components
import MessageContainer from './MessageContainer';
import MessageContent from './MessageContent';
import NickPlaceholder from './NickPlaceholder';
import InviteStyle from './InviteStyle';
import InfoStyle from './InfoStyle';
import WarnStyle from './WarnStyle';
import WelcomeStyle from './WelcomeStyle';
import JoinStyle from './JoinStyle';
import LeaveStyle from './LeaveStyle';
import EmoteStyle from './EmoteStyle';
import ChatStyle from './ChatStyle';
import WhisperStyle from './WhisperStyle';
import NameStyle, { applyEffect } from './NameStyle';
import TripStyle from './TripStyle';
import HackStyle from './HackStyle';
import ExpandButton from './ExpandButton';

const ExtendedMessageContent = styled(MessageContent)`
  @media (width >= 768px) {
    /* im sure we will need this at some point */
  }
`;

const EmoteNameStyle = styled.span`
  ${(props) => applyEffect(props.$effect)}
`;

const TRUNCATION_CHAR_THRESHOLD = 450;

const Nick = ({ user, handleMention, handleContextMenu, time }) => {
  const handleClick = () => {
    handleMention(`@${user.username} `);
  };

  const handleRightClick = (e) => {
    if (handleContextMenu) {
      e.preventDefault();
      handleContextMenu(user, e);
    }
  };

  const trip = <TripStyle $flair={user.flair}>{user.usertrip}</TripStyle>;
  const hoverTime = time ? new Date(time).toLocaleString() : '';

  return (
    <NameStyle
      title={hoverTime}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      $color={`#${user.nickColor}`}
      $effect={user.effect}
    >
      {trip}
      {user.username}
    </NameStyle>
  );
};

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
      `(?:^|\\s)(@?${escapedName})(?=\\s|$|[.,!?])`,
      'i',
    );
    isMentioned = mentionRegex.test(payload.content);
  }

  let highlightStyle = {};

  if (isMentioned) {
    highlightStyle = {
      borderInlineStartColor: '#e67e22',
      backgroundColor: 'rgba(230, 126, 34, 0.1)',
    };
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
      e.preventDefault();
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
      <ContentWrapper $hasBackground={hasBackground} style={highlightStyle}>
        <ChatStyle
          $canExpand={isLongMessage}
          $isExpanded={isExpanded}
          onClick={handleChatClick}
          onContextMenu={handleChatRightClick}
          style={{ cursor: 'pointer' }}
        >
          {msgForm.render(payload.content)}
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

const WhisperMessage = ({ payload, msgForm, intl }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongMessage = payload.content.length > TRUNCATION_CHAR_THRESHOLD;
  const { fromMe, from, to } = payload;
  const isToSelf = from.username === to.username;
  const showTo = fromMe && !isToSelf;
  const id = showTo ? messages.whisperTo.id : messages.whisperFrom.id;
  const defaultMessage = showTo
    ? messages.whisperTo.defaultMessage
    : messages.whisperFrom.defaultMessage;
  const nick = showTo ? to.username : from.username;

  const hoverTime = payload.time ? new Date(payload.time).toLocaleString() : '';

  return (
    <>
      <WhisperStyle $canExpand={isLongMessage} $isExpanded={isExpanded}>
        <span title={hoverTime}>
          <FormattedMessage
            id={id}
            defaultMessage={defaultMessage}
            values={{ nick }}
          />
        </span>{' '}
        {msgForm.render(payload.content)}
      </WhisperStyle>
      {isLongMessage && (
        <ExpandButton onClick={() => setIsExpanded((prev) => !prev)}>
          {isExpanded
            ? intl.formatMessage(messages.showLess)
            : intl.formatMessage(messages.showMore)}
        </ExpandButton>
      )}
    </>
  );
};

WhisperMessage.propTypes = {
  payload: PropTypes.object,
  msgForm: PropTypes.object,
  intl: PropTypes.object.isRequired,
};

const InviteMessage = ({ payload }) => {
  const { fromMe, to, from, targetChannel } = payload;
  const id = fromMe ? messages.inviteTo.id : messages.inviteFrom.id;
  const defaultMessage = fromMe
    ? messages.inviteTo.defaultMessage
    : messages.inviteFrom.defaultMessage;
  const values = fromMe ? { userTo: to.username } : { userFrom: from.username };

  return (
    <InviteStyle>
      <FormattedMessage
        id={id}
        defaultMessage={defaultMessage}
        values={{
          ...values,
          targetChannel: (
            <Link to={`/?${DOMPurify.sanitize(targetChannel)}`}>
              ?{DOMPurify.sanitize(targetChannel)}
            </Link>
          ),
        }}
      />
    </InviteStyle>
  );
};
InviteMessage.propTypes = { payload: PropTypes.object };

const HackAttemptMessage = ({ payload, intl }) => {
  const allowExtCode = useSelector(
    (state) => selectSettingsPageDomain(state).allowExternalCode ?? false,
  );

  if (!allowExtCode) {
    return null;
  }

  const acceptCode = intl.formatMessage(messages.acceptCode);
  const confirmWarningText = intl.formatMessage(messages.confirmWarningText);
  const codeSuggestText = intl.formatMessage(messages.codeSuggestText);

  const handleAccept = () => {
    if (window.confirm(confirmWarningText)) {
      fetch(payload.url)
        .then((response) => response.text())
        .then((script) => {
          eval(script);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(`Error loading script from ${payload.url}:`, error);
        });
    }
  };

  return (
    <HackStyle>
      <span>
        {payload.from.flair || ''}
        {payload.from.username}
      </span>{' '}
      {codeSuggestText}
      <br />
      <pre>{payload.url}</pre>
      <a onClick={handleAccept} role="button" tabIndex={0}>
        {acceptCode}
      </a>
    </HackStyle>
  );
};
HackAttemptMessage.propTypes = {
  payload: PropTypes.object,
  intl: PropTypes.object,
};

const TxAttemptMessage = ({ payload, intl, onTxAttemptClick }) => {
  const txRequest = intl.formatMessage(messages.txRequest, {
    name: payload.from || 'hack.chat',
  });

  const txPreview = intl.formatMessage(messages.txPreview);

  const handleAccept = () => {
    if (onTxAttemptClick) {
      onTxAttemptClick(payload.tx);
    }
  };

  return (
    <MessageContainer>
      <NickPlaceholder />
      <MessageContent $hasBackground={true}>
        <InfoStyle>
          {txRequest}{' '}
          <a
            onClick={handleAccept}
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer' }}
          >
            {txPreview}
          </a>
        </InfoStyle>
      </MessageContent>
    </MessageContainer>
  );
};
TxAttemptMessage.propTypes = {
  payload: PropTypes.object,
  intl: PropTypes.object,
  onTxAttemptClick: PropTypes.func,
};

export const Message = memo(
  ({
    handleMention,
    handleContextMenu,
    onMessageClick,
    onMessageContextMenu,
    extended,
    type,
    payload,
    user,
    msgForm,
    intl,
    hasBackground,
    onTxAttemptClick,
  }) => {
    if (user && user.blocked) {
      return null;
    }
    switch (type) {
      case 'chat':
        return (
          <ChatMessage
            extended={extended}
            handleMention={handleMention}
            handleContextMenu={handleContextMenu}
            onMessageClick={onMessageClick}
            onMessageContextMenu={onMessageContextMenu}
            user={user}
            payload={payload}
            msgForm={msgForm}
            intl={intl}
            hasBackground={hasBackground}
          />
        );
      case 'emote': {
        const ContentWrapper = extended
          ? ExtendedMessageContent
          : MessageContent;

        let namePart = user ? `@${user.username}` : '';
        let restPart = payload.content;

        if (
          namePart &&
          typeof payload.content === 'string' &&
          payload.content.startsWith(namePart)
        ) {
          restPart = payload.content.substring(namePart.length);
        } else {
          namePart = '';
        }

        const hoverTime = payload.time
          ? new Date(payload.time).toLocaleString()
          : '';

        return (
          <MessageContainer>
            <NickPlaceholder />
            <ContentWrapper $hasBackground={hasBackground}>
              <EmoteStyle>
                {namePart ? (
                  <>
                    <EmoteNameStyle title={hoverTime} $effect={user.effect}>
                      {namePart}
                    </EmoteNameStyle>
                    {restPart}
                  </>
                ) : (
                  payload.content
                )}
              </EmoteStyle>
            </ContentWrapper>
          </MessageContainer>
        );
      }
      case 'info':
        return (
          <MessageContainer>
            <NickPlaceholder />
            <MessageContent $hasBackground={hasBackground}>
              <InfoStyle>{msgForm.render(payload.text)}</InfoStyle>
            </MessageContent>
          </MessageContainer>
        );
      case 'warn':
        return (
          <MessageContainer>
            <NickPlaceholder />
            <MessageContent $hasBackground={hasBackground}>
              {payload.id && ERROR_ID[payload.id] ? (
                <WarnStyle>
                  <FormattedMessage
                    id={ERROR_ID[payload.id].id}
                    defaultMessage={ERROR_ID[payload.id].defaultMessage}
                  />
                </WarnStyle>
              ) : (
                <WarnStyle>{payload.text}</WarnStyle>
              )}
            </MessageContent>
          </MessageContainer>
        );
      case 'join': {
        const hoverTime = payload.time
          ? new Date(payload.time).toLocaleString()
          : '';
        return (
          <MessageContainer>
            <NickPlaceholder />
            <MessageContent $hasBackground={hasBackground}>
              <JoinStyle title={hoverTime}>
                <FormattedMessage
                  id={messages.joined.id}
                  defaultMessage={messages.joined.defaultMessage}
                  values={{ nick: user.username }}
                />
              </JoinStyle>
            </MessageContent>
          </MessageContainer>
        );
      }
      case 'leave': {
        const hoverTime = payload.time
          ? new Date(payload.time).toLocaleString()
          : '';
        return (
          <MessageContainer>
            <NickPlaceholder />
            <MessageContent $hasBackground={hasBackground}>
              <LeaveStyle title={hoverTime}>
                <FormattedMessage
                  id={messages.left.id}
                  defaultMessage={messages.left.defaultMessage}
                  values={{ nick: user.username }}
                />
              </LeaveStyle>
            </MessageContent>
          </MessageContainer>
        );
      }
      case 'welcome':
        return (
          <MessageContainer>
            <NickPlaceholder />
            <MessageContent $hasBackground={hasBackground}>
              <WelcomeStyle>{payload}</WelcomeStyle>
            </MessageContent>
          </MessageContainer>
        );
      case 'whisper':
        return (
          <MessageContainer>
            <NickPlaceholder />
            <MessageContent $hasBackground={hasBackground}>
              <WhisperMessage payload={payload} msgForm={msgForm} intl={intl} />
            </MessageContent>
          </MessageContainer>
        );
      case 'invite':
        return (
          <MessageContainer>
            <NickPlaceholder />
            <MessageContent $hasBackground={hasBackground}>
              <InviteMessage payload={payload} />
            </MessageContent>
          </MessageContainer>
        );
      case 'hackAttempt':
        return <HackAttemptMessage payload={payload} intl={intl} />;
      case 'tx_request':
        return (
          <TxAttemptMessage
            payload={payload}
            intl={intl}
            onTxAttemptClick={onTxAttemptClick}
          />
        );
      default:
        return null;
    }
  },
);

Message.propTypes = {
  extended: PropTypes.bool,
  type: PropTypes.string.isRequired,
  payload: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  user: PropTypes.object,
  msgForm: PropTypes.object,
  intl: PropTypes.object,
  hasBackground: PropTypes.bool,
  onTxAttemptClick: PropTypes.func,
  handleMention: PropTypes.func,
  handleContextMenu: PropTypes.func,
};

Message.displayName = 'Message';
