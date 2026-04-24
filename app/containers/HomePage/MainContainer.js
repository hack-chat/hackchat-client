/**
 * Exports a styled html div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: center;
  height: 100dvh;
  width: 100vw;
  overflow: hidden;

  @media (width <= 768px) {
    font-size: 1.2em;
  }
`;
