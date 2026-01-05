/**
 * Exports a styled html div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 850px;
  justify-content: flex-end;

  @media (min-width: 768px) {
    transform: translate(-110px, 0);
  }
`;
