/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  margin-top: 1rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.palette.text.secondary};
`;
