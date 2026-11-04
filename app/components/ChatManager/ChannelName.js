/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-inline-end: 1rem;
  flex: 1;
  min-width: 0;
`;
