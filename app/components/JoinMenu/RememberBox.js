/**
 * Exports a styled html div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  background: #2a2a2a;
  border: 1px solid #555;
  border-radius: 4px;
  color: #ddd;
  font-size: 1.25em;
  transition: all 0.2s ease;

  &:hover {
    border-color: #888;
  }

  &.checked {
    background-color: #a6a28c;
    border-color: #a6a28c;
  }

  &.checked::after {
    content: '✔';
    color: #1e1e1e;
  }
`;
