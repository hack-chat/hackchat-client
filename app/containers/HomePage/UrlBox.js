/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  background-color: ${({ theme }) => theme.palette.background.tertiary};
  border: 1px solid ${({ theme }) => theme.palette.border.subtle};
  border-radius: 6px;
  padding: 12px;
  margin-top: 15px;
  word-break: break-all;
  font-family: monospace;
  font-size: 1em;

  & > a {
    color: ${({ theme }) => theme.palette.accent.main};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
