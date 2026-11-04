/**
 * Exports a styled span
 */

import styled from 'styled-components';

export default styled.span`
  color: ${({ theme }) => theme.palette.text.muted};
  white-space: nowrap;
  user-select: none;
`;
