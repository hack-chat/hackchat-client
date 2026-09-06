/**
 * Exports a styled button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.palette.border.divider};
  color: ${({ theme }) => theme.palette.status.danger};
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.palette.status.dangerBg};
    border-color: ${({ theme }) => theme.palette.status.danger};
  }

  svg {
    font-size: 1.1em;
  }
`;
