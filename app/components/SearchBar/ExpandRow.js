/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 0.5rem;
  margin-top: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.palette.border.subtle};
`;
