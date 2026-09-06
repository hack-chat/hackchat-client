/**
 * Exports a styled button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  cursor: pointer;
  font-family: monospace;
  font-size: 1.25rem;
  min-height: 46px;
  width: max-content;
  padding: 0.25rem 1rem;
  margin-top: 1rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.palette.background.tertiary};
  background-color: ${({ theme }) => theme.palette.background.tertiary};
  color: ${({ theme }) => theme.palette.text.primary};
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.palette.border.light};
    border-color: ${({ theme }) => theme.palette.border.light};
  }

  &:active {
    background-color: ${({ theme }) => theme.palette.background.elementHover};
    border-color: ${({ theme }) => theme.palette.background.elementHover};
  }
`;
