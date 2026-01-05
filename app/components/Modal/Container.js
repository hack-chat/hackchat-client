/**
 * Exports a styled html div
 */

import styled from 'styled-components';

export default styled.div`
  position: relative;
  z-index: 11;
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: 500px;
  max-height: 90vh;
  min-height: 150px;
  background-color: #2a2a2a;
  border: 1px solid #555;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  padding: 0;
  padding-top: 2.5rem;
  overflow: hidden;

  @media (min-width: 768px) {
    padding-top: 0;
  }
`;
