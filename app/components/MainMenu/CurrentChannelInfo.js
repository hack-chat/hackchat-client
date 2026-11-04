/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.main};
`;
