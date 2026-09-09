/**
 * Exports a styled div
 */

import styled from 'styled-components';

const WelcomeStyle = styled.div`
  color: ${({ theme }) => theme.palette.status.info};
  font-family: 'DejaVu Sans Mono', monospace;
  margin-top: 1em;
`;

export default WelcomeStyle;
