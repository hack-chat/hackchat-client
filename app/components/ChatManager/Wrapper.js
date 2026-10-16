/**
 * Exports a styled div
 */

import styled from 'styled-components';
import thinScrollbar from 'utils/thinScrollbar';

export default styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  min-height: 0;

  ${thinScrollbar}
`;
