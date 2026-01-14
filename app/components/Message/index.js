/**
 * Message exports the UI for a child element of the ChatManager,
 * dispatching to the correct sub-component based on message type.
 */
import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { doTransfer } from 'containers/WalletLayer/actions';

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
import NameStyle from './NameStyle';
import TripStyle from './TripStyle';
import HackStyle from './HackStyle';
import ExpandButton from './ExpandButton';

const ExtendedMessageContent = styled(MessageContent)`
  @media (min-width: 768px) {
  }
`;

const TRUNCATION_CHAR_THRESHOLD = 450;

const Nick = ({ user, handleMention }) => {
  const handleClick = () => {
    handleMention(`@${user.username} `);
  };
  const trip = <TripStyle $flair={user.flair}>{user.usertrip}</TripStyle>;
  return (
    <NameStyle onClick={handleClick} $color={`#${user.nickColor}`}>
      {trip}
      {user.username}
    </NameStyle>
  );
};
Nick.propTypes = { user: PropTypes.object.isRequired };

const ChatMessage = ({
  handleMention,
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

  return (
    <MessageContainer>
      {!extended ? (
        <Nick handleMention={handleMention} user={user} />
      ) : (
        <NickPlaceholder />
      )}
      <ContentWrapper $hasBackground={hasBackground}>
        <ChatStyle $canExpand={isLongMessage} $isExpanded={isExpanded}>
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

  return (
    <>
      <WhisperStyle $canExpand={isLongMessage} $isExpanded={isExpanded}>
        <FormattedMessage
          id={id}
          defaultMessage={defaultMessage}
          values={{ nick }}
        />{' '}
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

const TxAttemptMessage = ({ payload, intl }) => {
  const dispatch = useDispatch();
  const [hasAccepted, setHasAccepted] = useState(false);

  const txRequest = intl.formatMessage(messages.txRequest, {
    name: payload.from || 'hack.chat',
  });

  const txPreview = intl.formatMessage(messages.txPreview);

  const handleAccept = () => {
    if (hasAccepted) return;

    setHasAccepted(true);
    dispatch(doTransfer(payload.tx));
  };

  return (
    <MessageContainer>
      <NickPlaceholder />
      <MessageContent $hasBackground={true}>
        <InfoStyle>
          {txRequest}{' '}
          {hasAccepted ? (
            <span
              style={{
                textDecoration: 'line-through',
                opacity: 0.6,
                cursor: 'default',
              }}
            >
              {txPreview}
            </span>
          ) : (
            <a
              onClick={handleAccept}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            >
              {txPreview}
            </a>
          )}
        </InfoStyle>
      </MessageContent>
    </MessageContainer>
  );
};
TxAttemptMessage.propTypes = {
  payload: PropTypes.object,
  intl: PropTypes.object,
};

export const Message = memo(
  ({
    handleMention,
    extended,
    type,
    payload,
    user,
    msgForm,
    intl,
    hasBackground,
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
        return (
          <MessageContainer>
            <NickPlaceholder />
            <ContentWrapper $hasBackground={hasBackground}>
              <EmoteStyle>{payload.content}</EmoteStyle>
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
      case 'join':
        return (
          <MessageContainer>
            <NickPlaceholder />
            <MessageContent $hasBackground={hasBackground}>
              <JoinStyle>
                <FormattedMessage
                  id={messages.joined.id}
                  defaultMessage={messages.joined.defaultMessage}
                  values={{ nick: user.username }}
                />
              </JoinStyle>
            </MessageContent>
          </MessageContainer>
        );
      case 'leave':
        return (
          <MessageContainer>
            <NickPlaceholder />
            <MessageContent $hasBackground={hasBackground}>
              <LeaveStyle>
                <FormattedMessage
                  id={messages.left.id}
                  defaultMessage={messages.left.defaultMessage}
                  values={{ nick: user.username }}
                />
              </LeaveStyle>
            </MessageContent>
          </MessageContainer>
        );
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
        return <TxAttemptMessage payload={payload} intl={intl} />;
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
};

Message.displayName = 'Message';
