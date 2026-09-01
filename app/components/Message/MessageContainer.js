/**
 * Exports a styled html div
 * 
 * @todo add perf option, enabling and disabling:
 * content-visibility: auto;
 * contain-intrinsic-size: auto 24px;
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
