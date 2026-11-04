/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.main};
  padding-bottom: 1rem;
  margin-bottom: 2rem;

  h1 {
    margin: 0;
    font-size: 1.8rem;
    color: ${({ theme }) => theme.palette.accent.main};
  }
`;
