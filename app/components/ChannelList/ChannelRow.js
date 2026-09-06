/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 1em;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.subtle};
  font-family: monospace;
  color: ${({ theme }) => theme.palette.text.primary};
  cursor: pointer;

  &:nth-child(even) {
    background-color: ${({ theme }) => theme.palette.background.alt};
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.hover};
  }

  &:last-child {
    border-bottom: none;
  }
`;
