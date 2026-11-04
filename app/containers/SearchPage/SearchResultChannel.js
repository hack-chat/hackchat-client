/**
 * Exports a styled span
 */

import styled from 'styled-components';

export default styled.span`
  color: ${({ theme }) => theme.palette.accent.main};
  font-weight: 600;
`;
