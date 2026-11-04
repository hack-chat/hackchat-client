/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  min-width: 0;
  padding: 0.75rem 0.5em;
  min-height: 48px;
  background-color: ${({ theme }) => theme.palette.background.alt};
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.divider};

  @media (width >= 768px) {
    padding-inline-start: 1em;
    border-inline-start: 1px solid
      ${({ theme }) => theme.palette.border.divider};
  }
`;
