/**
 * Exports an animated div container
 */

import styled, { keyframes } from 'styled-components';
import thinScrollbar from 'utils/thinScrollbar';

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

  ${thinScrollbar}

  & > div:last-child > div:last-child {
    padding-bottom: ${({ theme }) => theme.padding.chat.lastChild};
  }
`;
