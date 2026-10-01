/**
 * Exports an animated div container
 */

import styled, { keyframes } from 'styled-components';

const delayedFade = keyframes`
  0% { opacity: 0; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

export default styled.div`
  animation: ${delayedFade} 0.3s ease-in forwards;
  width: 100%;
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
    padding-bottom: ${({ theme }) => theme.padding.chat.lastChild};
  }
`;
