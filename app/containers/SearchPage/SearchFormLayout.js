/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: ${({ theme }) => theme.palette.background.alt};
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.border.light};
`;
