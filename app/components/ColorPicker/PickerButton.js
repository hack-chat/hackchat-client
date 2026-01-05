/**
 * Exports a styled html button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2a2a2a;
  border: none;
  color: #ddd;
  width: 100%;
  height: 100%;
  padding: 0;
  cursor: pointer;
  font-size: 1.25em;
  border-radius: 0;
  transition: all 0.2s ease;

  &:hover {
    background-color: #444 !important;
  }

  & > svg {
    filter: drop-shadow(-1px -1px 0px rgba(0, 0, 0, 0.5))
      drop-shadow(1px -1px 0px rgba(0, 0, 0, 0.5))
      drop-shadow(1px 1px 0px rgba(0, 0, 0, 0.5))
      drop-shadow(-1px 1px 0px rgba(0, 0, 0, 0.5));
  }
`;
