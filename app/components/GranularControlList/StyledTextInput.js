/**
 * Exports a styled input
 */

import styled from 'styled-components';

export default styled.input.attrs({ type: 'text' })`
  width: 100%;
  min-height: 46px;
  padding-inline: 16px;
  border-radius: 4px;
  font-size: inherit;
  font-family: ${(props) => props.theme.typography.primary};
  transition: all 0.2s ease;
  background-color: ${({ theme }) => theme.palette.background.menu};
  color: ${({ theme }) => theme.palette.text.primary};
  border: 1px solid ${({ theme }) => theme.palette.border.main};

  &:hover {
    border-color: ${({ theme }) => theme.palette.border.focus};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.accent.main};
    background-color: ${({ theme }) => theme.palette.background.element};
  }

  &::placeholder {
    color: ${({ theme }) => theme.palette.text.muted};
  }
`;
