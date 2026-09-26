/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  font-family: monospace;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  color: ${({ theme }) => theme.palette.text.code};
`;
