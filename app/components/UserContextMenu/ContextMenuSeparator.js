/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.palette.border.main};
  margin: 0.25rem 0.5rem;
`;
