/**
 * Exports a styled html button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  color: #ddd;
  background-color: #333;
  min-height: 42px;
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #444;
    color: #fff;
  }
`;
