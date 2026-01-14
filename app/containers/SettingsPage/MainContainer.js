/**
 * Exports a styled html div
 */
import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100dvh;
  width: 100vw;
  background-color: transparent;
  color: #f5f5f7;
  overflow: hidden;

  h4 {
    margin-bottom: 24px;
    color: #a6a28c;
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;
