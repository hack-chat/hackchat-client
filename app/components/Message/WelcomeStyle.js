/**
 * Exports a styled div
 */

import styled from 'styled-components';

// the class is a stable hook for theme customCss
const WelcomeStyle = styled.div.attrs({ className: 'welcome' })`
  color: ${({ theme }) => theme.palette.status.info};
  margin-top: ${({ theme }) => theme.padding.chat.firstChild};
`;

export default WelcomeStyle;
