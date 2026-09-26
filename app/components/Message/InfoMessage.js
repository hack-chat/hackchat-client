/**
 * Exports the ui to display incoming info events
 */

import React from 'react';
import PropTypes from 'prop-types';

import { INFO_ID } from './messages';
import MessageContainer from './MessageContainer';
import MessageContent from './MessageContent';
import InfoStyle from './InfoStyle';
import NickPlaceholder from './NickPlaceholder';

const InfoMessage = ({ payload, msgForm, intl, hasBackground }) => {
  let contentString = '';

  if (payload.id && INFO_ID[payload.id]) {
    contentString = intl.formatMessage(
      {
        id: INFO_ID[payload.id].id,
        defaultMessage: INFO_ID[payload.id].defaultMessage,
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
        <InfoStyle>{msgForm.render(contentString)}</InfoStyle>
      </MessageContent>
    </MessageContainer>
  );
};

InfoMessage.propTypes = {
  payload: PropTypes.object.isRequired,
  msgForm: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  hasBackground: PropTypes.bool,
};

export default InfoMessage;
