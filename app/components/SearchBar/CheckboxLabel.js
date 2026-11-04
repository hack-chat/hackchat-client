/**
 * Exports a styled label
 */

import styled from 'styled-components';

export default styled.label`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  cursor: pointer;
  user-select: none;
  padding-inline-end: 0.6em;

  input[type='checkbox'] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
`;
