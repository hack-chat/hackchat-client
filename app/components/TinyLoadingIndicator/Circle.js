/**
 * Exports the style for the loading indicator
 */

import styled, { keyframes, css } from 'styled-components';

const circleFadeDelay = keyframes`
  0%,
  39%,
  100% {
    opacity: 0;
  }

  40% {
    opacity: 1;
  }
`;

const getRotation = (props) => {
  if (typeof props.$rotate === 'number') {
    return css`
      transform: rotate(${props.$rotate}deg);
    `;
  }
  return '';
};

const getAnimationDelay = (props) => {
  if (typeof props.$delay === 'number') {
    return css`
      animation-delay: ${props.$delay}s;
    `;
  }
  return '';
};

export default styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  ${getRotation}

  &::before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 15%;
    height: 15%;
    background-color: ${({ theme }) => theme.palette.text.muted};
    border-radius: 100%;
    animation: ${circleFadeDelay} 1.2s infinite ease-in-out both;

    ${getAnimationDelay}
  }
`;
