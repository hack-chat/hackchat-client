/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  width: 46px;
  height: 46px;
  border: 1px solid ${({ theme }) => theme.palette.border.divider};
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
`;
