/**
 * Exports a styled div
 */

import styled from 'styled-components';

const HackStyle = styled.div`
  color: ${({ theme }) => theme.palette.status.info};
  font-family: 'DejaVu Sans Mono', monospace;

  a {
    color: ${({ theme }) => theme.palette.accent.main};
  }
`;

export default HackStyle;
