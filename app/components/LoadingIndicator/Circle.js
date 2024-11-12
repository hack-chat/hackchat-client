/* eslint indent: 0 */

/**
 * Exports the style for the loading indicator
 */

import styled, { keyframes } from 'styled-components';

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

const Circle = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  ${(props) =>
    props.rotate
      ? props.rotate &&
        `
    -webkit-transform: rotate(${props.rotate}deg);
    -ms-transform: rotate(${props.rotate}deg);
    transform: rotate(${props.rotate}deg);
  `
      : ''}

  &::before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 15%;
    height: 15%;
    background-color: #999;
    border-radius: 100%;
    animation: ${circleFadeDelay} 1.2s infinite ease-in-out both;
    ${(props) =>
      props.delay
        ? props.delay &&
          `
      -webkit-animation-delay: ${props.delay}s;
      animation-delay: ${props.delay}s;
    `
        : ''};
  }
`;

export { Circle };
