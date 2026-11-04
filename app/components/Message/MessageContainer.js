/**
 * Exports a styled div
 */

import styled from 'styled-components';

const MessageContainer = styled.div.attrs({ className: 'message' })`
  display: flex;
  flex-direction: column;

  @media (width >= 768px) {
    flex-direction: row;
    align-items: stretch;
  }
`;

export default MessageContainer;
