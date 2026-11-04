/**
 * Exports a styled button
 */

import styled from 'styled-components';

export default styled.button.attrs({ type: 'button' })`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.palette.accent.main};
  color: ${({ theme }) => theme.palette.accent.main};
  border-radius: 4px;
  padding: 4px 12px;
  font-size: 0.85em;
  font-family: ${(props) => props.theme.typography.primary};
  cursor: pointer;
  align-self: flex-start;
  margin-top: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.palette.accent.main};
    color: ${({ theme }) => theme.palette.text.white};
  }
`;
