/**
 * Exports a styled input
 */

import styled from 'styled-components';

export default styled.input`
  flex-grow: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  color: #ddd;
  font-size: 1em;
  min-width: 0;

  &::placeholder {
    color: #888;
  }

  &.invalid {
    color: #f44336;

    &::placeholder {
      color: #f44336a0;
    }
  }
`;
