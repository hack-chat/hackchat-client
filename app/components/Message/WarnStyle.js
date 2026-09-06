/**
 * Exports a styled div
 */

import styled from 'styled-components';

const WarnStyle = styled.div`
  color: ${({ theme }) => theme.palette.status.error};
  font-family: 'DejaVu Sans Mono', monospace;
`;

export default WarnStyle;
