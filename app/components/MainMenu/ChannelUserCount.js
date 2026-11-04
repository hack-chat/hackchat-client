/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  display: block;
  font-size: 0.9em;
  font-weight: normal;
  color: ${({ theme }) => theme.palette.text.secondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
