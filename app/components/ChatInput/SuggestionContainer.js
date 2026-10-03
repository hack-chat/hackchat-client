/**
 * Exports a styled div
 */

import styled from 'styled-components';
import thinScrollbar from 'utils/thinScrollbar';

export default styled.div`
  position: absolute;
  bottom: 100%;
  background-color: ${({ theme }) => theme.palette.background.menu};
  border: 1px solid ${({ theme }) => theme.palette.border.main};
  border-bottom: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  max-width: 618px;
  width: 100%;
  right: 0;

  ${thinScrollbar}

  @media (width <= 767px) {
    left: calc(220px + 1em);
    right: auto;
  }
`;
