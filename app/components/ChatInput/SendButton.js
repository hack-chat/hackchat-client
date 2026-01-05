/**
 * Exports a styled html button for sending messages.
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  color: #a6a28c;
  font-size: 1.2em;
  padding: 5px;
  border-top: 1px solid rgba(125, 122, 104, 0.5);

  &:focus {
    outline: none;
    box-shadow: none !important;
  }

  &:hover {
    color: #f5f5f7;
  }

  & > svg {
    filter: drop-shadow(1px 1px 0 #000);
  }
`;
