/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  color: ${({ theme }) => theme.palette.status.info};
  margin-top: 0.25rem;
`;
