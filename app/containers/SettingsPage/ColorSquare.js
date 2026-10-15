/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  width: 46px;
  height: 46px;
  border: 1px solid ${({ theme }) => theme.palette.border.divider};
  border-start-start-radius: 0;
  border-end-start-radius: 0;
  border-start-end-radius: 4px;
  border-end-end-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
`;
