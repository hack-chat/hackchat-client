/**
 * Exports a styled ContextMenuItem
 */

import styled from 'styled-components';
import ContextMenuItem from './ContextMenuItem';

export default styled(ContextMenuItem)`
  font-weight: bold;
  border-bottom: 1px solid #444;

  &:hover {
    background-color: #444;
  }
`;
