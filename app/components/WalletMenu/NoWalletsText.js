/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  padding: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.palette.text.muted};
`;
