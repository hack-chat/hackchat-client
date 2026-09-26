/**
 * Exports the ui to display incoming warning events
 */

import React from 'react';
import PropTypes from 'prop-types';

import { ERROR_ID } from './messages';
import MessageContainer from './MessageContainer';
import MessageContent from './MessageContent';
import WarnStyle from './WarnStyle';
import NickPlaceholder from './NickPlaceholder';

const WarnMessage = ({ payload, msgForm, intl, hasBackground }) => {
  let contentString = '';

  if (payload.id && ERROR_ID[payload.id]) {
    contentString = intl.formatMessage(
      {
        id: ERROR_ID[payload.id].id,
        defaultMessage: ERROR_ID[payload.id].defaultMessage,
      },
      payload.args || {},
    );
  } else {
    contentString = payload.text || '';
  }

  return (
    <MessageContainer>
      <NickPlaceholder />
      <MessageContent $hasBackground={hasBackground}>
        <WarnStyle>{msgForm.render(contentString)}</WarnStyle>
      </MessageContent>
    </MessageContainer>
  );
};

WarnMessage.propTypes = {
  payload: PropTypes.object.isRequired,
  msgForm: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  hasBackground: PropTypes.bool,
};

export default WarnMessage;
