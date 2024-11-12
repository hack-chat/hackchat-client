/**
 * Exports a styled div element, this wraps the first message upon
 * entering a channel
 */

import styled from 'styled-components';

const WelcomeStyle = styled.div`
  border-left: 1px solid #386498 !important;
  color: #3b7ed0;
  padding-left: 1em;
  padding-top: 0.5rem;
  font-size: 0.9rem;
  font-weight: 200;
  font-family: 'DejaVu Sans Mono', monospace;
`;

export default WelcomeStyle;
