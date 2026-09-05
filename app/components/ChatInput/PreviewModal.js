/**
 * Exports
 */

import React from 'react';
import PropTypes from 'prop-types';

import MessageFormatter from 'components/MessageFormatter';
import MessageContainer from 'components/Message/MessageContainer';
import MessageContent from 'components/Message/MessageContent';

import PreviewContainer from './PreviewContainer';
import PreviewTitle from './PreviewTitle';
import PreviewChatStyle from './PreviewChatStyle';

export default function PreviewModal({ text, title }) {
  return (
    <PreviewContainer>
      <PreviewTitle>{title}</PreviewTitle>
      <MessageContainer>
        <MessageContent $hasBackground={false}>
          <PreviewChatStyle $canExpand={false} $isExpanded={true}>
            {MessageFormatter.render(text)}
          </PreviewChatStyle>
        </MessageContent>
      </MessageContainer>
    </PreviewContainer>
  );
}

PreviewModal.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string,
};
