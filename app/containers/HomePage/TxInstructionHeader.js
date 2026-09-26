/**
 * Exports a styled span
 */

import styled from 'styled-components';

export default styled.span`
  color: ${({ theme }) => theme.palette.text.white};
  font-weight: bold;
`;
