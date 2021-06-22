/* eslint react/prop-types: 0 */

/**
 * ChatManager exports the ui rendering functions to display chat channel
 * events, based on the currently selected channel
 * @todo temp eslint rule, ref line 34
 */

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Remarkable } from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';
import { linkify } from 'remarkable/linkify';
import DOMPurify from 'dompurify';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

import ChatInput from 'components/ChatInput';
import Message from 'components/Message';

import {
  makeSelectChannel,
  makeSelectChannelData,
} from 'containers/CommunicationProvider/selectors';

import { Row, Col, Table } from 'reactstrap';
import Wrapper from './Wrapper';

// @todo Rebuild markdown and related into component form
// along with child component functions then remove top eslint rule
hljs.registerLanguage('javascript', javascript);

const md = new Remarkable('full', {
  html: false,
  xhtmlOut: false,
  breaks: true,
  langPrefix: '',
  linkTarget: '_blank',
  typographer: true,
  quotes: `""''`,
  doHighlight: true,
}).use(linkify);

md.core.ruler.disable(['abbr']);

md.renderer = new RemarkableReactRenderer({
  components: {
    a: ({ href, title, children }) => {
      const html = `<a href="${href}" target="_blank" title="${title}" rel="noopener noreferrer">${children}</a>`;

      return (
        <span
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(html, { ADD_ATTR: ['target'] }),
          }}
        />
      );
    },
    img: ({ alt, src, title }) => {
      const html = `<a href="${src}" target="_blank" title="${
        title || alt
      }" rel="noopener noreferrer">${src}</a>`;

      return (
        <span
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(html, { ADD_ATTR: ['target'] }),
          }}
        />
      );
    },
    table: ({ children }) => (
      <Table dark striped>
        {children}
      </Table>
    ),
    p: ({ children }) => {
      const alteredChildren = [];
      for (let i = 0, j = children.length; i < j; i += 1) {
        if (typeof children[i] === 'string') {
          if (children[i].indexOf('?') !== -1) {
            const chunks = children[i].split(/(\?\S*)/gm);
            for (let k = 0, l = chunks.length; k < l; k += 1) {
              if (chunks[k][0] === '?') {
                const key = `invite-${Math.random() * 9999}`;
                alteredChildren.push(
                  <Link key={key} to={`/${DOMPurify.sanitize(chunks[k])}`}>
                    {DOMPurify.sanitize(chunks[k])}
                  </Link>,
                );
              } else if (chunks[k] !== '') {
                alteredChildren.push(chunks[k]);
              }
            }
          } else {
            alteredChildren.push(children[i]);
          }
        } else {
          alteredChildren.push(children[i]);
        }
      }

      return <p>{alteredChildren}</p>;
    },
    pre: ({ content, params: language }) => {
      if (hljs.getLanguage(language)) {
        try {
          return (
            <pre
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: hljs.highlight(language, content).value,
              }}
            />
          );
        } catch (__) {
          // Yolo error handling
        }
      }

      try {
        return (
          <pre
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: hljs.highlightAuto(content).value,
            }}
          />
        );
      } catch (__) {
        // You're changing the outcome by measuring the result, stop counting errors
      }

      return '';
    },
  },
});

export function ChatManager({ channel, channelData }) {
  let users = '';
  let messages = '';
  let welcome = (
    <Row key="welcome" center="xs">
      <Col lg="2" md="1" sm="1" />
      <Col lg="8" md="10" sm="10">
        <Message md={md} extended={false} type="welcome" payload="" user={{}} />
      </Col>
      <Col lg="2" md="1" sm="1" />
    </Row>
  );

  if (typeof channelData[channel] !== 'undefined') {
    // @todo Messages pagination here
    if (channelData[channel].users.length === 1) {
      users = 'You are alone.';
    } else {
      users = `Users online: ${channelData[channel].users
        .map((user) => user[1].username)
        .join(', ')}`;
    }

    welcome = (
      <Row key="welcome" center="xs">
        <Col sm="12">
          <Message
            md={md}
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
      if (lastId === msg.data.payload.userid) {
        extend = true;
      } else {
        extend = false;
      }

      if (msg.type === 'chat') {
        lastId = msg.data.payload.userid;
      } else {
        lastId = -1;
      }

      const rowId = i;
      const user = msg.data.client.users.get(msg.data.payload.userid);
      return (
        <Row key={rowId} center="xs">
          <Col sm="12">
            <Message
              md={md}
              extended={extend}
              type={msg.type}
              payload={msg.data.payload}
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
