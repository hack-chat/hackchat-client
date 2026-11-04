/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  background-color: ${({ theme }) => theme.palette.background.element};
  border: 1px solid ${({ theme }) => theme.palette.border.subtle};
  border-radius: 6px;
  padding: 12px 16px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  &:hover {
    border-color: ${({ theme }) => theme.palette.border.main};
  }
`;
