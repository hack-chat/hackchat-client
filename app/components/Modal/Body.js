/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 1rem;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.palette.scrollbar.menuThumb}
    ${({ theme }) => theme.palette.scrollbar.track};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.palette.scrollbar.track};
    border-left: 1px solid ${({ theme }) => theme.palette.scrollbar.menuThumb};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.palette.scrollbar.menuThumb};
    border-radius: 4px;
    border: 2px solid ${({ theme }) => theme.palette.scrollbar.track};
  }
`;
