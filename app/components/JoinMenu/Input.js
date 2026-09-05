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
  font-size: 1em;
  min-width: 0;
  color: ${(props) => (props.$invalid ? '#f44336' : '#ddd')};

  &::placeholder {
    color: ${(props) => (props.$invalid ? '#f44336a0' : '#888')};
  }
`;
