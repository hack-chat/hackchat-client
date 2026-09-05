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
`;
