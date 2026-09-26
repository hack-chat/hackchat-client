/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  color: ${({ theme }) => theme.palette.text.muted};
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;
