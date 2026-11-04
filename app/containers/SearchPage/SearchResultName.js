/**
 * Exports a styled span
 */

import styled from 'styled-components';

export default styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.primary};
`;
