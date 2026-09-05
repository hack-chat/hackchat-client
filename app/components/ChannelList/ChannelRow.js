/**
 * Exports a styled html div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 1em;
  border-bottom: 1px solid rgb(125 122 104 / 20%);
  font-family: monospace;
  color: #f5f5f7;
  cursor: pointer;

  &:nth-child(even) {
    background-color: #2a2a2a;
  }

  &:hover {
    background-color: #151513;
  }

  &:last-child {
    border-bottom: none;
  }
`;
