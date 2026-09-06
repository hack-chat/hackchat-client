/**
 * Exports a styled textarea
 */

import styled from 'styled-components';

export default styled.textarea`
  flex-grow: 1;
  min-height: 4em;
  max-width: 600px;
  max-height: 200px;
  height: auto;
  resize: none;
  padding: 0.75em 1em;
  box-sizing: border-box;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.palette.border.divider};
  border-inline-start: 1px solid ${({ theme }) => theme.palette.border.divider};
  background-color: transparent;
  color: ${({ theme }) => theme.palette.text.primary};
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.palette.text.muted};
  }

  @media (width <= 767px) {
    border-inline-start: none;
    max-width: 100%;
    padding: 0.75em 0.5em;
  }

  @media (width <= 768px) {
    font-size: 1.2em;
  }
`;
