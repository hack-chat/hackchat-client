/**
 * Exports a styled td
 */

import styled from 'styled-components';

export default styled.td`
  cursor: pointer;
  user-select: none;
  text-align: center !important;
  font-size: 1.2em;
  transition: background 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.hover};
  }
`;
