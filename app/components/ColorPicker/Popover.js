/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  position: fixed;
  z-index: 13;
  top: ${(props) => props.$top || 0}px;
  left: ${(props) => props.$left || 0}px;
  transform: translateX(-50%);
`;
