/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.span`
  color: ${({ theme }) => theme.palette.text.muted};
  margin-left: 0.5rem;
`;
