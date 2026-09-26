/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  color: ${({ theme }) => theme.palette.text.white};
  font-weight: bold;
  font-size: 1.2rem;
`;
