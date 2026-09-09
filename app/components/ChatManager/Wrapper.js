/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  height: 0;
  flex: 1;
  overflow: hidden auto;
  min-height: 0;
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

  & > div:last-child > div:last-child {
    padding-bottom: 1.5em;
  }
`;
