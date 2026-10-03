/**
 * Exports a styled div
 */

import styled from 'styled-components';

// the class is a stable hook for theme customCss
const WarnStyle = styled.div.attrs({ className: 'warn' })`
  color: ${({ theme }) => theme.palette.status.error};

  & > p {
    margin: 0;
    overflow-wrap: anywhere;
  }

  & > a,
  & > p > a,
  & > p > span > a {
    color: ${({ theme }) => theme.palette.accent.main};
  }
`;

export default WarnStyle;
