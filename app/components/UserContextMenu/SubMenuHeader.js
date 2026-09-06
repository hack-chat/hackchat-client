/**
 * Exports a styled ContextMenuItem
 */

import styled from 'styled-components';
import ContextMenuItem from './ContextMenuItem';

export default styled(ContextMenuItem)`
  font-weight: bold;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.main};

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.elementHover};
  }
`;
