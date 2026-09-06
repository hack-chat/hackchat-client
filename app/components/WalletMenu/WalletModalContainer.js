/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.palette.background.modal};
  color: ${({ theme }) => theme.palette.text.primary};
  min-width: 300px;
`;
