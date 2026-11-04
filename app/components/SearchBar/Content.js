/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
  padding: 0.5rem 0.75rem;
  background-color: ${({ theme }) => theme.palette.background.menu};
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.main};

  @media (width >= 768px) {
    padding-inline-start: 1em;
    border-inline-start: 1px solid ${({ theme }) => theme.palette.border.main};
  }
`;
