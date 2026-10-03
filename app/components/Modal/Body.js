/**
 * Exports a styled div
 */

import styled from 'styled-components';
import thinScrollbar from 'utils/thinScrollbar';

export default styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 1rem;

  ${thinScrollbar}
`;
