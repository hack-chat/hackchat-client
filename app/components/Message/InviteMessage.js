/**
 * Exports the ui to display invite events
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import DOMPurify from 'dompurify';

import messages from './messages';
import InviteStyle from './InviteStyle';

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

InviteMessage.propTypes = {
  payload: PropTypes.object.isRequired,
};

export default InviteMessage;
