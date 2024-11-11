/* eslint react/prop-types: 0 */

/**
 * ChatManager exports the ui rendering functions to display chat channel
 * events, based on the currently selected channel
 * @todo temp eslint rule, ref line 34
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ChatInput from 'components/ChatInput';
import Message from 'components/Message';

import {
  makeSelectChannel,
  makeSelectChannelData,
} from 'containers/CommunicationProvider/selectors';

import { Row, Col } from 'reactstrap';
import MessageFormatter from 'components/MessageFormatter';
import Wrapper from './Wrapper';

export function ChatManager({ channel, channelData }) {
  let users = '';
  let messages = '';
  let welcome = (
    <Row key="welcome" center="xs">
      <Col lg="2" md="1" sm="1" />
      <Col lg="8" md="10" sm="10">
        <Message
          msgForm={MessageFormatter}
          extended={false}
          type="welcome"
          payload=""
          user={{}}
        />
      </Col>
      <Col lg="2" md="1" sm="1" />
    </Row>
  );

  if (typeof channelData[channel] !== 'undefined') {
    // @todo Messages pagination here
    if (channelData[channel].users.length === 1) {
      users = 'You are alone.';
    } else {
      const userIdList = Object.keys(channelData[channel].users);
      let usernameList = [];
      userIdList.forEach((id) => {
        if (channelData[channel].users[id].online) {
          usernameList.push(channelData[channel].users[id].username);
        }
      });
      users = `Users online: ${usernameList.join(', ')}`;
    }

    welcome = (
      <Row key="welcome" center="xs">
        <Col sm="12">
          <Message
            msgForm={MessageFormatter}
            extended={false}
            type="welcome"
            payload={`Joined channel "${channel}". ${users}`}
            user={{}}
          />
        </Col>
      </Row>
    );

    let lastId = -1;
    let extend = false;

    messages = channelData[channel].messages.map((msg, i) => {
      let user = {};
      if (typeof msg.data.userid !== 'undefined') {
        user = channelData[channel].users[msg.data.userid];

        if (lastId === msg.data.userid) {
          extend = true;
        } else {
          extend = false;
        }
      }

      if (msg.type === 'chat') {
        lastId = msg.data.userid;
      } else {
        lastId = -1;
      }

      return (
        <Row key={i} center="xs">
          <Col sm="12">
            <Message
              msgForm={MessageFormatter}
              extended={extend}
              type={msg.type}
              payload={msg.data}
              user={user}
            />
          </Col>
        </Row>
      );
    });
  }

  let scrollDom = '';

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef && messagesEndRef.current) {
      if (messagesEndRef.current.scrollIntoView) {
        messagesEndRef.current.scrollIntoView();
      }
    }
  }, [messages]);

  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 1) {
    scrollDom = <div ref={messagesEndRef} />;
  }

  return (
    <Wrapper fluid className="d-flex flex-column">
      {welcome}
      {messages}
      {scrollDom}
      <Row className="mt-auto g-0" center="xs">
        <Col lg="2" md="1" sm="1" />
        <Col lg="8" md="10" sm="10">
          <ChatInput channel={channel} />
        </Col>
        <Col lg="2" md="1" sm="1" />
      </Row>
    </Wrapper>
  );
}

ChatManager.propTypes = {
  channel: PropTypes.string.isRequired,
  channelData: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  channel: makeSelectChannel(),
  channelData: makeSelectChannelData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ChatManager);
