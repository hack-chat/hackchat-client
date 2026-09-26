/**
 * Exports the ui to display whisper events
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import WhisperStyle from './WhisperStyle';
import ExpandButton from './ExpandButton';

const TRUNCATION_CHAR_THRESHOLD = 450;

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
  payload: PropTypes.object.isRequired,
  msgForm: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default WhisperMessage;
