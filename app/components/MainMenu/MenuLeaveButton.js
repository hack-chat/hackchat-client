/**
 * Exports a styled html button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  position: absolute;
  top: 1rem;
  right: 3em;
  z-index: 10;
  background: none;
  border: none;
  color: #aaa;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: #ff4d4d;
  }
`;
