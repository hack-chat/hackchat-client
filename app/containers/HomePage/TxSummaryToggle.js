/**
 * Exports a styled summary
 */

import styled from 'styled-components';

export default styled.summary`
  cursor: pointer;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.accent.main};
  outline: none;

  &:hover {
    color: ${({ theme }) => theme.palette.accent.hover};
  }
`;
