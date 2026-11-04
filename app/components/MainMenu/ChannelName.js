/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  display: block;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.white};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
