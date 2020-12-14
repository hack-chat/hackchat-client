/**
 * Exports a styled div element, this wraps the message portion
 * of a normal chat message event
 */

import styled from 'styled-components';

const ChatStyle = styled.div`
  border-left: 1px solid #386498 !important;
  color: #d3d0c1;
  padding-left: 1em;

  font-size: 0.9rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-weight: 400;
  font-family: 'DejaVu Sans Mono', monospace;

  & > p {
    margin-bottom: 0;
  }
`;

export default ChatStyle;
