/**
 * The main layout container for the chat view. Stacks the message
 * list and chat input vertically.
 */
import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 850px;
`;
