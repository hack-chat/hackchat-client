/**
 * Exports a styled html button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  cursor: pointer;
  font-family: monospace;
  font-size: 1.25rem;
  min-height: 46px;
  width: max-content;
  padding: 0.25rem 1rem;
  margin-top: 1rem;
  border-radius: 4px;
  border: 1px solid #555;
  background-color: #555;
  color: #ddd;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #666;
    border-color: #666;
  }

  &:active {
    background-color: #444;
    border-color: #444;
  }
`;
