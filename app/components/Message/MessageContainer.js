/**
 * Exports a styled div
 *
 * @todo add perf option, enabling and disabling:
 * content-visibility: auto;
 * contain-intrinsic-size: auto 24px;
 */

import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > div:last-child {
    padding-top: 0.3em;
    padding-bottom: 0.3em;
  }

  @media (width >= 768px) {
    flex-direction: row;
  }
`;
export default MessageContainer;
