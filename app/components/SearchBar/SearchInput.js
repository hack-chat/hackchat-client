/**
 * Exports a styled input
 */

import styled from 'styled-components';

export default styled.input.attrs({
  type: 'text',
})`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.palette.text.primary};
  font-family: inherit;
  font-size: 1em;
  padding: 0 0.25rem;
  min-width: 0;

  &::placeholder {
    color: ${({ theme }) => theme.palette.text.muted};
  }
`;
