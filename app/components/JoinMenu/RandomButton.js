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
  background: transparent;
  border: none;
  color: #ddd;
  width: 100%;
  height: 100%;
  padding: 0;
  cursor: pointer;
  font-size: 1.25em;
  border-radius: 0;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #444;
  }
`;
