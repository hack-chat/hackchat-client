/**
 * Exports a styled div
 */

import styled from 'styled-components';

const WelcomeStyle = styled.div.attrs({ className: 'welcome' })`
  color: ${({ theme }) => theme.palette.status.info};
  margin-top: ${({ theme }) => theme.padding.chat.firstChild};
`;

export default WelcomeStyle;
