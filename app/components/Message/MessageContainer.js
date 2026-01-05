/**
 * A flex container for a single message row, arranging the Nick
 * and the message content side-by-side on desktop and stacked on mobile.
 */
import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
export default MessageContainer;
