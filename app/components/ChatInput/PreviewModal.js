/**
 * Exports
 */

import React from 'react';
import PropTypes from 'prop-types';

import MessageFormatter from 'components/MessageFormatter';
import MessageContainer from 'components/Message/MessageContainer';
import MessageContent from 'components/Message/MessageContent';
import ChatStyle from 'components/Message/ChatStyle';

export default function PreviewModal({ text, title }) {
  return (
    <div style={{ padding: '1rem', width: '100%', margin: '0 auto' }}>
      <h1>{title}</h1>
      <MessageContainer>
        <MessageContent $hasBackground={false}>
          <ChatStyle
            $canExpand={false}
            $isExpanded={true}
            style={{ cursor: 'arrow' }}
          >
            {MessageFormatter.render(text)}
          </ChatStyle>
        </MessageContent>
      </MessageContainer>
    </div>
  );
}

PreviewModal.propTypes = {
  text: PropTypes.string.isRequired,
};
