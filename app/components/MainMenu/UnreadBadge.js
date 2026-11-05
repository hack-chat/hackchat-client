/**
 * Exports a styled span
 */

import styled from 'styled-components';

export default styled.span`
  background-color: ${({ theme }) => theme.palette.status.mentionBorder};
  color: ${({ theme }) => theme.palette.text.inverse};
  border-radius: 10px;
  padding: 1px 6px;
  font-size: 0.75em;
  margin-inline-start: 4px;
  font-weight: bold;
  vertical-align: middle;
`;
