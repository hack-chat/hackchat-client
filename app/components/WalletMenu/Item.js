/**
 * Exports a styled li element
 */

import styled from 'styled-components';

export default styled.li`
  padding: 0.8rem 0.5rem;
  color: #ddd;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  font-size: 1.1em;
  opacity: 1;

  &.active {
    background-color: #333;
    font-weight: bold;
  }

  &:hover {
    background-color: #333;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: transparent;
  }

  svg {
    margin-right: 8px;
  }
`;
