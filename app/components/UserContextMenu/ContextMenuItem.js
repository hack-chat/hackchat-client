/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.palette.text.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  white-space: nowrap;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.hover};
  }

  > svg:first-child:not(:last-child) {
    margin-right: 8px;
  }

  > svg:last-child:not(:first-child) {
    margin-left: 16px;
    font-size: 0.8em;
  }
`;
