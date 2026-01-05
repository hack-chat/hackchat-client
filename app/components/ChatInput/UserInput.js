/**
 * Exports a styled textarea for user input.
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
  border-top: 1px solid rgba(125, 122, 104, 0.5);
  border-left: 1px solid rgba(125, 122, 104, 0.5);
  background-color: transparent;
  color: #f5f5f7;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #8a8a8a;
  }

  @media (max-width: 767px) {
    border-left: none;
    max-width: 100%;
    padding: 0.75em 0.5em;
  }
`;
