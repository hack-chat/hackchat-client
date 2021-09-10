/**
 * Message exports the ui rendering functions to display a child element
 * of the ChatManager
 */

import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Col, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import InviteStyle from './InviteStyle';
import InfoStyle from './InfoStyle';
import WarnStyle from './WarnStyle';
import WelcomeStyle from './WelcomeStyle';
import JoinStyle from './JoinStyle';
import LeaveStyle from './LeaveStyle';
import EmoteStyle from './EmoteStyle';
import ChatStyle from './ChatStyle';
import WhisperStyle from './WhisperStyle';

import {AdminNick, ModNick, UserNick} from './NickStyles';
import {AdminTrip, ModTrip, UserTrip} from './TripStyles';
import messages, {ERROR_ID} from './messages';

function Message({extended, type, payload, user, msgForm}) {
  if (user && user.isBlocked) return <br />;

  let message;
  let nick;
  let trip;

  switch (type) {
    case 'invite':
      const key = `invite-${Math.random() * 9999}`;
      if (payload.fromMe) {
        message = InviteFromMe(payload, key);
        break;
      }
      message = InviteFromUser(payload, key);
      break;
    case 'info':
      message = <InfoStyle>{msgForm.render(payload.text)}</InfoStyle>;
      break;
    case 'warn':
      message = ValidateWarnPayload(payload);
      break;
    case 'welcome':
      message = <WelcomeStyle>{payload}</WelcomeStyle>;
      break;
    case 'join':
      message = JoinMessage(user);
      break;
    case 'leave':
      message = LeaveMessage(user);
      break;
    case 'emote':
      message = <EmoteStyle>{payload.content}</EmoteStyle>;
      break;
    case 'whisper':
      message = ProcessWhisper(msgForm, payload);
      break;
    case 'chat':
      const obj = ProcessNotExtended(extended, user);
      nick = obj.nick;
      trip = obj.trip;
      message = <ChatStyle>{msgForm.render(payload.content)}</ChatStyle>;
      break;
    default:
  }

  return (
    <Row className={'g-0'}>
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

let isSent = false;
function ProcessWhisper(msgForm, payload){
  let isMine = payload.fromMe;
  let source = payload.from.username;
  let destination = payload.to.username;

  if (!isMine) return WhisperFrom(msgForm, payload);
  if (source === destination && isSent) {
    isSent = false;
    return WhisperFrom(msgForm, payload);
  }
  isSent = true;

  return WhisperTo(msgForm, payload);
}

function InviteFromMe(payload, key) {
  return (
    <InviteStyle>
      <FormattedMessage
        id={messages.inviteTo.id}
        defaultMessage={messages.inviteTo.defaultMessage}
        values={{
          userTo: `${payload.to}`,
          targetChannel: (<Link key={key} to={`/?${DOMPurify.sanitize(payload.targetChannel)}`}>
            ?{DOMPurify.sanitize(payload.targetChannel)}
          </Link>),
        }}
      />
    </InviteStyle>
  );
}

function InviteFromUser(payload, key) {
  return (
    <InviteStyle>
      <FormattedMessage
        id={messages.inviteFrom.id}
        defaultMessage={messages.inviteFrom.defaultMessage}
        values={{
          userFrom: `${payload.from}`,
          targetChannel: (<Link key={key} to={`/?${DOMPurify.sanitize(payload.targetChannel)}`}>
            ?{DOMPurify.sanitize(payload.targetChannel)}
          </Link>),
        }}
      />
    </InviteStyle>
  );
}

function WhisperTo(msgForm, payload) {
  return (
    <WhisperStyle>
      <FormattedMessage
        id={messages.whisperTo.id}
        defaultMessage={messages.whisperTo.defaultMessage}
        values={{
          nick: `${payload.to}`,
        }}
      />{' '}
      {msgForm.render(payload.content)}
    </WhisperStyle>
  );
}

function WhisperFrom(msgForm, payload) {
  return (
    <WhisperStyle>
      <FormattedMessage
        id={messages.whisperFrom.id}
        defaultMessage={messages.whisperFrom.defaultMessage}
        values={{
          nick: `${payload.from}`,
        }}
      />{' '}
      {msgForm.render(payload.content)}
    </WhisperStyle>
  );
}

function LeaveMessage(user) {
  return (
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
}

function JoinMessage(user) {
  return (
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
}

function ValidateWarnPayload(payload) {
  if (
    typeof payload.id !== 'undefined' &&
    typeof ERROR_ID[payload.id] !== 'undefined'
  ) {
      return (
        <Row className={'g-0'}>
          <Col lg="2" md="2" sm="1">
          </Col>
          <Col lg="8" md="10" sm="10">
          <FormattedMessage
            id={ERROR_ID[payload.id]}
            defaultMessage="Unknown error"/>
          </Col>
          <Col lg="2" md="1" sm="1"></Col>
        </Row>
      );
  } else {
    return (<WarnStyle>{payload.text}</WarnStyle>);
  }
}

function ProcessNotExtended(extended, user) {
  let trip = '';
  let nick = '';
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
  return ({nick, trip});
}

Message.propTypes = {
  extended: PropTypes.bool,
  type: PropTypes.string,
  payload: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  user: PropTypes.object,
  msgForm: PropTypes.object,
};

export default memo(Message);
