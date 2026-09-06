/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 15px;
  font-family: monospace;
  color: ${({ theme }) => theme.palette.text.code};
`;
