/**
 * Exports a styled html button
 */
import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  cursor: pointer;
  width: 100%;
  min-height: 46px;
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #333;
  color: #ddd;
  border: 1px solid #555;
  border-radius: 4px;
  font-family: monospace;
  font-weight: bold;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #4d4d4d;
    color: #fff;
    border-color: #a6a28c;
  }

  &:active {
    background-color: #a6a28c;
    color: #1e1e1e;
  }
`;
