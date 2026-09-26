/**
 * Message exports the UI for a child element of the ChatManager,
 * dispatching to the correct sub-component based on message type.
 */

import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import messages from './messages';

// Import all layout and style components
import MessageContainer from './MessageContainer';
import MessageContent from './MessageContent';
import ExtendedMessageContent from './ExtendedMessageContent';
import NickPlaceholder from './NickPlaceholder';
import WelcomeStyle from './WelcomeStyle';
import JoinStyle from './JoinStyle';
import LeaveStyle from './LeaveStyle';
import EmoteStyle from './EmoteStyle';
import EmoteNameStyle from './EmoteNameStyle';

import ChatMessage from './ChatMessage';
import WhisperMessage from './WhisperMessage';
import InviteMessage from './InviteMessage';
import HackAttemptMessage from './HackAttemptMessage';
import TxAttemptMessage from './TxAttemptMessage';
import InfoMessage from './InfoMessage';
import WarnMessage from './WarnMessage';

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
          <InfoMessage
            payload={payload}
            msgForm={msgForm}
            intl={intl}
            hasBackground={hasBackground}
          />
        );
      case 'warn':
        return (
          <WarnMessage
            payload={payload}
            msgForm={msgForm}
            intl={intl}
            hasBackground={hasBackground}
          />
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
