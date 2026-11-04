/**
 * Exports a styled span
 */

import styled from 'styled-components';

export default styled.span`
  font-size: 0.95em;
  color: ${({ theme }) => theme.palette.text.primary};
`;
