/**
 * Exports a styled div
 */

import styled from 'styled-components';

const getOpacity = (props) => {
  if (props.$disabled) return 0.4;
  return 1;
};

const getPointerEvents = (props) => {
  if (props.$disabled) return 'none';
  return 'auto';
};

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.subtle};
  cursor: pointer;
  user-select: none;
  opacity: ${getOpacity};
  pointer-events: ${getPointerEvents};
  transition: opacity 0.2s ease;

  &:last-child {
    border-bottom: none;
  }
`;
