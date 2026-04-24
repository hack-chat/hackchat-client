/**
 * Exports a styled html button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: 1px solid rgb(125 122 104 / 50%);
  color: #ff6b6b;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgb(255 107 107 / 10%);
    border-color: #ff6b6b;
  }

  svg {
    font-size: 1.1em;
  }
`;
