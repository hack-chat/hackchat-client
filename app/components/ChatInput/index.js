/**
 * ChatInput exports the ui rendering functions to display the main chat input
 */

import React, { useEffect, memo } from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { sendChat } from 'containers/CommunicationProvider/actions';
import { InputGroup, InputGroupAddon } from 'reactstrap';
import { FaPaperPlane } from 'react-icons/fa';

import messages from './messages';
import Form from './Form';
import UserInput from './UserInput';
import SendButton from './SendButton';

const MaxMsgHistory = 25;

// eslint-disable-next-line no-return-assign, no-cond-assign, no-param-reassign
const incSearchIndex = (index, max) => ((index += 1) > max ? max : index);

// eslint-disable-next-line no-return-assign, no-cond-assign, no-param-reassign
const decSearchIndex = (index) => ((index -= 1) < 0 ? -1 : index);

export function ChatInput({ channel, onSendChat }) {
  const [chatInputField, setChatInput] = useStateIfMounted();
  const [msgHistory, updateMsgHistory] = useStateIfMounted([]);
  const [searchIndex, setSearchIndex] = useStateIfMounted(0);

  useEffect(() => {
    const listener = (evt) => {
      if (evt.code === 'Enter' || evt.code === 'NumpadEnter') {
        if (!evt.shiftKey) {
          submitInput(evt);
          chatInputField.style.height = 'auto';
        } else {
          chatInputField.style.height = 'inherit';
          chatInputField.style.height = `${chatInputField.scrollHeight}px`;
        }
      } else if (evt.code === 'ArrowUp' && chatInputField) {
        if (searchIndex === 0 && chatInputField.value) {
          updateMsgHistory(
            [chatInputField.value].concat(msgHistory.slice(0, MaxMsgHistory)),
          );
        }

        setSearchIndex(incSearchIndex(searchIndex, msgHistory.length));
        chatInputField.value = msgHistory[searchIndex] || '';
      } else if (evt.code === 'ArrowDown' && chatInputField) {
        setSearchIndex(decSearchIndex(searchIndex));
        chatInputField.value = msgHistory[searchIndex] || '';
      }
    };

    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [chatInputField, searchIndex, msgHistory]);

  const submitInput = (evt) => {
    if (evt) {
      if (evt.preventDefault) evt.preventDefault();
      if (evt.stopPropagation) evt.stopPropagation();
      if (evt.nativeEvent && evt.nativeEvent.stopImmediatePropagation)
        evt.nativeEvent.stopImmediatePropagation();
    }

    const chatText = chatInputField.value;
    if (chatText) {
      onSendChat(channel, chatText);
      chatInputField.value = '';
      if (searchIndex !== 0) {
        setSearchIndex(0);
      }
      updateMsgHistory([chatText].concat(msgHistory.slice(0, MaxMsgHistory)));
    }
  };

  const onUserInput = (evt) => {
    const { target } = evt;
    setChatInput(target);
    if (target.value) {
      target.style.height = 'inherit';
      target.style.height = `${target.scrollHeight + 2}px`;
    } else {
      target.style.height = 'auto';
    }
  };

  const inputDom = (
    <Form onSubmit={submitInput}>
      <InputGroup size="sm">
        <FormattedMessage
          id={messages.MainInput.id}
          defaultMessage={messages.MainInput.defaultMessage}
        >
          {(placeholder) => (
            <UserInput
              autoFocus
              rows="1"
              onChange={onUserInput}
              type="textarea"
              placeholder={placeholder}
            />
          )}
        </FormattedMessage>

        <InputGroupAddon addonType="append">
          <SendButton type="submit">
            <FaPaperPlane />
          </SendButton>
        </InputGroupAddon>
      </InputGroup>
    </Form>
  );

  return inputDom;
}

ChatInput.propTypes = {
  channel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onSendChat: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    onSendChat: (channel, message) => dispatch(sendChat(channel, message)),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ChatInput);
