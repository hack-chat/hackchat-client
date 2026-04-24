/**
 * Exports a styled html div
 */

import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (width >= 768px) {
    flex-direction: row;
  }
`;
export default MessageContainer;
