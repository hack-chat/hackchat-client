/**
 * Exports a styled div
 */

import styled from 'styled-components';

const WelcomeStyle = styled.div.attrs({ className: 'welcome' })`
  color: ${({ theme }) => theme.palette.status.info};
  min-height: calc(100dvh - 5rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export default WelcomeStyle;
