/**
 * Exports a styled div
 */

import styled from 'styled-components';
import thinScrollbar from 'utils/thinScrollbar';

export default styled.div`
  display: flex;
  flex-direction: column;
  height: 0;
  flex: 1;
  overflow: hidden auto;
  min-height: 0;

  ${thinScrollbar}

  & > div:last-child > div:last-child {
    padding-bottom: ${({ theme }) => theme.padding.chat.lastChild};
  }
`;
