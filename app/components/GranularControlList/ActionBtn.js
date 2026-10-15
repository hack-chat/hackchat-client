/**
 * Exports a styled button
 */

import styled from 'styled-components';

export default styled.button`
  padding: 10px 16px;
  background-color: ${({ theme }) => theme.palette.background.element};
  border: 1px solid ${({ theme }) => theme.palette.border.main};
  color: ${({ theme }) => theme.palette.text.primary};
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.hover};
  }
`;
