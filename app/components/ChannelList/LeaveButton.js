/**
 * Exports a styled button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.palette.text.muted};
  border-radius: 4px;
  padding: 4px 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.palette.status.dangerBg};
    border-color: ${({ theme }) => theme.palette.status.danger};
    color: ${({ theme }) => theme.palette.status.danger};
  }

  svg {
    font-size: 1.2em;
  }
`;
