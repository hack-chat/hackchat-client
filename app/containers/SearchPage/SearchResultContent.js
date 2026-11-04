/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  font-size: 0.95em;
  color: ${({ theme }) => theme.palette.text.primary};
  line-height: 1.4;
  word-break: break-word;
`;
