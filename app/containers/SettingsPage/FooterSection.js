/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  margin-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.palette.border.main};
  padding-top: 16px;
`;
