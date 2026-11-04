/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85em;
  color: ${({ theme }) => theme.palette.text.secondary};
`;
