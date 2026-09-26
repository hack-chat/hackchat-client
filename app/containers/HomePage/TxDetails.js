/**
 * Exports a styled details
 */

import styled from 'styled-components';

export default styled.details`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  background-color: ${({ theme }) => theme.palette.background.menu};
  padding: 1rem;
  border-radius: 4px;
`;
