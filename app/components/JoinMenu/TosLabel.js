/**
 * Exports a styled label
 */

import styled, { css } from 'styled-components';

export default styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  margin-top: 0.5em;
  margin-bottom: 1em;
  padding: 10px 15px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.background.alt};
  border: 1px solid transparent;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 0.9em;
  user-select: none;
  cursor: pointer;

  ${({ theme, $error }) => {
    if ($error) {
      return css`
        background-color: ${theme.palette.status.dangerBg};
        border-color: ${theme.palette.status.danger};
      `;
    }
  }}

  & a {
    color: ${({ theme }) => theme.palette.text.primary};
    text-decoration: underline;
    transition: color 0.15s ease;

    &:hover {
      color: ${({ theme }) => theme.palette.text.white};
    }
  }
`;
