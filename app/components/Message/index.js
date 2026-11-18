/**
 * Message exports the UI for a child element of the ChatManager,
 * dispatching to the correct sub-component based on message type.
 */

import React, { memo, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import messages from './messages';

import MessageContainer from './MessageContainer';
import MessageContent from './MessageContent';
import ExtendedMessageContent from './ExtendedMessageContent';
import NickPlaceholder from './NickPlaceholder';
import WelcomeStyle from './WelcomeStyle';
import JoinStyle from './JoinStyle';
import LeaveStyle from './LeaveStyle';
import EmoteStyle from './EmoteStyle';
import EmoteName from './EmoteName';
import ChatMessage from './ChatMessage';
import WhisperMessage from './WhisperMessage';
import InviteMessage from './InviteMessage';
import HackAttemptMessage from './HackAttemptMessage';
import TxAttemptMessage from './TxAttemptMessage';
import InfoMessage from './InfoMessage';
import WarnMessage from './WarnMessage';

class MessageErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.warn('Message error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <MessageContainer>
          <NickPlaceholder />
          {/* @todo translation */}
          <MessageContent>[ Message corrupted ]</MessageContent>
        </MessageContainer>
      );
    }
    return this.props.children;
  }
}

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
    isSearchHighlighted,
  }) => {
    let safePayload = payload;
    if (payload && typeof payload === 'object') {
      safePayload = { ...payload };
      if (safePayload.content && typeof safePayload.content !== 'string') {
        try {
          safePayload.content = JSON.stringify(safePayload.content);
        } catch {
          safePayload.content = '';
        }
      }
    } else if (payload && typeof payload !== 'string') {
      try {
        safePayload = JSON.stringify(payload);
      } catch {
        safePayload = '';
      }
    }

    const renderMessageContent = () => {
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
              payload={safePayload}
              msgForm={msgForm}
              intl={intl}
              hasBackground={hasBackground}
              isSearchHighlighted={isSearchHighlighted}
            />
          );
        case 'emote': {
          const ContentWrapper = extended
            ? ExtendedMessageContent
            : MessageContent;

          let namePart = user ? `@${user.username}` : '';
          let restPart = safePayload.content;

          if (
            namePart &&
            typeof safePayload.content === 'string' &&
            safePayload.content.startsWith(namePart)
          ) {
            restPart = safePayload.content.substring(namePart.length);
          } else {
            namePart = '';
          }

          const hoverTime = safePayload.time
            ? new Date(safePayload.time).toLocaleString()
            : '';

          return (
            <MessageContainer>
              <NickPlaceholder />
              <ContentWrapper $hasBackground={hasBackground}>
                <EmoteStyle>
                  {namePart ? (
                    <>
                      <EmoteName title={hoverTime} effect={user.effect}>
                        {namePart}
                      </EmoteName>
                      {restPart}
                    </>
                  ) : (
                    safePayload.content
                  )}
                </EmoteStyle>
              </ContentWrapper>
            </MessageContainer>
          );
        }
        case 'info':
          return (
            <InfoMessage
              payload={safePayload}
              msgForm={msgForm}
              intl={intl}
              hasBackground={hasBackground}
            />
          );
        case 'warn':
          return (
            <WarnMessage
              payload={safePayload}
              msgForm={msgForm}
              intl={intl}
              hasBackground={hasBackground}
            />
          );
        case 'join': {
          const hoverTime = safePayload.time
            ? new Date(safePayload.time).toLocaleString()
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
          const hoverTime = safePayload.time
            ? new Date(safePayload.time).toLocaleString()
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
                <WelcomeStyle>{safePayload}</WelcomeStyle>
              </MessageContent>
            </MessageContainer>
          );
        case 'whisper':
          return (
            <MessageContainer>
              <NickPlaceholder />
              <MessageContent
                $hasBackground={hasBackground}
                $isMentioned={!safePayload.fromMe}
              >
                <WhisperMessage
                  payload={safePayload}
                  msgForm={msgForm}
                  intl={intl}
                />
              </MessageContent>
            </MessageContainer>
          );
        case 'invite':
          return (
            <MessageContainer>
              <NickPlaceholder />
              <MessageContent
                $hasBackground={hasBackground}
                $isMentioned={!safePayload.fromMe}
              >
                <InviteMessage payload={safePayload} />
              </MessageContent>
            </MessageContainer>
          );
        case 'hackAttempt':
          return <HackAttemptMessage payload={safePayload} intl={intl} />;
        case 'tx_request':
          return (
            <TxAttemptMessage
              payload={safePayload}
              intl={intl}
              onTxAttemptClick={onTxAttemptClick}
            />
          );
        default:
          return null;
      }
    };

    return (
      <MessageErrorBoundary>{renderMessageContent()}</MessageErrorBoundary>
    );
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
  isSearchHighlighted: PropTypes.bool,
};

Message.displayName = 'Message';
