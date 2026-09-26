/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  margin-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.main};
  padding-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;
