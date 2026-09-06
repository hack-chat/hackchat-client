/**
 * Exports a styled div
 */
import styled from 'styled-components';

export default styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.main};
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;
