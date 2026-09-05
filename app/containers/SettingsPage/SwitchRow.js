/**
 * Exports a styled html div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(125 122 104 / 20%);
  cursor: pointer;
  user-select: none;
  opacity: ${(props) => (props.$disabled ? 0.4 : 1)};
  pointer-events: ${(props) => (props.$disabled ? 'none' : 'auto')};
  transition: opacity 0.2s ease;

  &:last-child {
    border-bottom: none;
  }
`;
