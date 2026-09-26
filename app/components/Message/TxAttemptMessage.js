/**
 * Exports the ui to display incoming transaction events
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import messages from './messages';
import MessageContainer from './MessageContainer';
import MessageContent from './MessageContent';
import InfoStyle from './InfoStyle';
import ActionLink from './ActionLink';
import NickPlaceholder from './NickPlaceholder';

const TX_TIMEOUT_MS = 105000;

const TxAttemptMessage = ({ payload, intl, onTxAttemptClick }) => {
  const [isExpired, setIsExpired] = useState(() => {
    if (!payload.timestamp) return false;
    return Date.now() - payload.timestamp >= TX_TIMEOUT_MS;
  });

  useEffect(() => {
    if (isExpired || !payload.timestamp) return;

    const timeRemaining = TX_TIMEOUT_MS - (Date.now() - payload.timestamp);

    if (timeRemaining <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsExpired(true);
    }, timeRemaining);

    return () => clearTimeout(timer);
  }, [payload.timestamp, isExpired]);

  const txRequest = intl.formatMessage(messages.txRequest, {
    name: payload.from || 'hack.chat',
  });

  const txPreview = intl.formatMessage(messages.txPreview);

  const handleAccept = () => {
    if (!isExpired && onTxAttemptClick) {
      onTxAttemptClick(payload);
    }
  };

  return (
    <MessageContainer>
      <NickPlaceholder />
      <MessageContent $hasBackground={true}>
        <InfoStyle>
          {txRequest}{' '}
          {isExpired ? (
            <span
              style={{
                textDecoration: 'line-through',
                opacity: 0.5,
                cursor: 'not-allowed',
              }}
            >
              {txPreview}
            </span>
          ) : (
            <ActionLink onClick={handleAccept} role="button" tabIndex={0}>
              {txPreview}
            </ActionLink>
          )}
        </InfoStyle>
      </MessageContent>
    </MessageContainer>
  );
};

TxAttemptMessage.propTypes = {
  payload: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  onTxAttemptClick: PropTypes.func,
};

export default TxAttemptMessage;
