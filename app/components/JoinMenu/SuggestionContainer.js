/**
 * Exports a styled div
 */

import styled from 'styled-components';

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
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.palette.scrollbar.menuThumb}
    ${({ theme }) => theme.palette.scrollbar.track};

  @media (width <= 767px) {
    left: calc(220px + 1em);
    right: auto;
  }
`;
