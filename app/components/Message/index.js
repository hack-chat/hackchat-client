/**
 * Message exports the ui rendering functions to display a child element
 * of the ChatManager
 */

import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import InviteStyle from './InviteStyle';
import InfoStyle from './InfoStyle';
import WarnStyle from './WarnStyle';
import WelcomeStyle from './WelcomeStyle';
import JoinStyle from './JoinStyle';
import LeaveStyle from './LeaveStyle';
import EmoteStyle from './EmoteStyle';
import ChatStyle from './ChatStyle';
import WhisperStyle from './WhisperStyle';

import { UserNick, ModNick, AdminNick } from './NickStyles';
import { UserTrip, ModTrip, AdminTrip } from './TripStyles';
import messages, { ERROR_ID } from './messages';

function Message({ extended, type, payload, user, md }) {
  if (user && user.isBlocked) return <br />;

  let message;
  let nick;
  let trip = '';

  switch (type) {
    case 'invite':
      if (payload.fromMe) {
        message = (
          <InviteStyle>
            <FormattedMessage
              id={messages.inviteTo.id}
              defaultMessage={messages.inviteTo.defaultMessage}
              values={{
                userTo: `${payload.to}`,
                targetChannel: payload.targetChannel,
              }}
            />
          </InviteStyle>
        );
      } else {
        message = (
          <InviteStyle>
            <FormattedMessage
              id={messages.inviteFrom.id}
              defaultMessage={messages.inviteFrom.defaultMessage}
              values={{
                userFrom: `${payload.from}`,
                targetChannel: payload.targetChannel,
              }}
            />
          </InviteStyle>
        );
      }
      break;
    case 'info':
      message = <InfoStyle>{md.render(payload.text)}</InfoStyle>;
      break;
    case 'warn':
      if (
        typeof payload.id !== 'undefined' &&
        typeof ERROR_ID[payload.id] !== 'undefined'
      ) {
        message = (
          <FormattedMessage
            id={ERROR_ID[payload.id]}
            defaultMessage="Unknown error"
          />
        );
      } else {
        message = <WarnStyle>{payload.text}</WarnStyle>;
      }
      break;
    case 'welcome':
      message = <WelcomeStyle>{payload}</WelcomeStyle>;
      break;
    case 'join':
      message = (
        <JoinStyle>
          <FormattedMessage
            id={messages.joined.id}
            defaultMessage={messages.joined.defaultMessage}
            values={{
              nick: user.username,
            }}
          />
        </JoinStyle>
      );
      break;
    case 'leave':
      message = (
        <LeaveStyle>
          <FormattedMessage
            id={messages.left.id}
            defaultMessage={messages.left.defaultMessage}
            values={{
              nick: user.username,
            }}
          />
        </LeaveStyle>
      );
      break;
    case 'emote':
      message = <EmoteStyle>{payload.content}</EmoteStyle>;
      break;
    case 'whisper':
      if (payload.fromMe) {
        message = (
          <WhisperStyle>
            <FormattedMessage
              id={messages.whisperTo.id}
              defaultMessage={messages.whisperTo.defaultMessage}
              values={{
                nick: `${payload.to}`,
              }}
            />{' '}
            {md.render(payload.content)}
          </WhisperStyle>
        );
      } else {
        message = (
          <WhisperStyle>
            <FormattedMessage
              id={messages.whisperFrom.id}
              defaultMessage={messages.whisperFrom.defaultMessage}
              values={{
                nick: `${payload.from}`,
              }}
            />{' '}
            {md.render(payload.content)}
          </WhisperStyle>
        );
      }

      break;
    case 'chat':
      if (!extended) {
        const hasTrip = user.usertrip !== '' || false;

        if (user.userlevel === 'user') {
          if (hasTrip) {
            trip = <UserTrip>{user.usertrip}</UserTrip>;
          }

          nick = (
            <UserNick color={user.color ? `#${user.color}` : undefined}>
              {trip}
              {user.username}
            </UserNick>
          );
        } else if (user.userlevel === 'mod') {
          if (hasTrip) {
            trip = <ModTrip>{user.usertrip}</ModTrip>;
          }

          nick = (
            <ModNick color={user.color ? `#${user.color}` : undefined}>
              {trip}
              {user.username}
            </ModNick>
          );
        } else if (user.userlevel === 'admin') {
          if (hasTrip) {
            trip = <AdminTrip>{user.usertrip}</AdminTrip>;
          }

          nick = (
            <AdminNick color={user.color ? `#${user.color}` : undefined}>
              {trip}
              {user.username}
            </AdminNick>
          );
        }
      }

      message = <ChatStyle>{md.render(payload.content)}</ChatStyle>;
      break;
    default:
  }

  return (
    <Row noGutters>
      <Col lg="2" md="2" sm="1">
        {nick}
      </Col>
      <Col lg="8" md="10" sm="10">
        {message}
      </Col>
      <Col lg="2" md="1" sm="1"></Col>
    </Row>
  );
}

Message.propTypes = {
  extended: PropTypes.bool,
  type: PropTypes.string,
  payload: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  user: PropTypes.object,
  md: PropTypes.object,
};

export default memo(Message);
