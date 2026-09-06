/**
 * Exports a styled button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  cursor: pointer;
  width: 100%;
  min-height: 46px;
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: ${({ theme }) => theme.palette.background.element};
  color: ${({ theme }) => theme.palette.text.primary};
  border: 1px solid ${({ theme }) => theme.palette.border.light};
  border-radius: 4px;
  font-family: monospace;
  font-weight: bold;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.tertiary};
    color: ${({ theme }) => theme.palette.text.white};
    border-color: ${({ theme }) => theme.palette.border.focus};
  }

  &:active {
    background-color: ${({ theme }) => theme.palette.accent.main};
    color: ${({ theme }) => theme.palette.text.inverse};
  }
`;
