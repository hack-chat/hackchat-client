/**
 * Exports a styled Virtuoso
 */

import styled from 'styled-components';
import { Virtuoso } from 'react-virtuoso';
import thinScrollbar from 'utils/thinScrollbar';

export default styled(Virtuoso)`
  ${thinScrollbar}
  height: 100%;
`;
