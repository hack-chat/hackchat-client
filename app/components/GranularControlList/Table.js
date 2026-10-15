/**
 * Exports a styled table
 */

import styled from 'styled-components';

export default styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;

  th,
  td {
    padding: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.border.subtle};
  }

  th {
    font-weight: bold;
    background-color: ${({ theme }) => theme.palette.background.element};
  }
`;
