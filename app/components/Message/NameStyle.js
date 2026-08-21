/**
 * Exports a styled html div and effect animations
 */

import styled, { keyframes, css } from 'styled-components';

const colorSwirl = keyframes`
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
`;

const pulseGlow = keyframes`
  0% { text-shadow: 0 0 2px currentColor; }
  50% { text-shadow: 0 0 12px currentColor; }
  100% { text-shadow: 0 0 2px currentColor; }
`;

const bounceMove = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
`;

const glitchText = keyframes`
  0% { transform: translate(0) }
  20% { transform: translate(-2px, 1px) }
  40% { transform: translate(-1px, -1px) }
  60% { transform: translate(2px, 1px) }
  80% { transform: translate(1px, -1px) }
  100% { transform: translate(0) }
`;

const neonFlicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #0fa, 0 0 40px #0fa, 0 0 80px #0fa; opacity: 1; }
  20%, 24%, 55% { text-shadow: none; opacity: 0.5; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px) rotate(-1deg); }
  75% { transform: translateX(2px) rotate(1deg); }
`;

const floatAnim = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
`;

const hellfire = keyframes`
  0% { text-shadow: 0 -1px 4px #ff3, 0 -2px 10px #ff8000, 0 -10px 20px #ff4136; }
  50% { text-shadow: 0 -2px 6px #ff3, 0 -4px 12px #ff8000, 0 -12px 24px #ff4136; }
  100% { text-shadow: 0 -1px 4px #ff3, 0 -2px 10px #ff8000, 0 -10px 20px #ff4136; }
`;

const matrixStretch = keyframes`
  0%, 100% { transform: scaleY(1); color: #0f0; text-shadow: 0 0 5px #0f0; }
  50% { transform: scaleY(1.1); color: #fff; text-shadow: 0 0 15px #0f0; }
`;

const flip3d = keyframes`
  0% { transform: perspective(400px) rotateY(0); }
  50% { transform: perspective(400px) rotateY(180deg); }
  100% { transform: perspective(400px) rotateY(360deg); }
`;

const squeeze = keyframes`
  0%, 100% { transform: scale3d(1, 1, 1); }
  30% { transform: scale3d(1.25, 0.75, 1); }
  40% { transform: scale3d(0.75, 1.25, 1); }
  50% { transform: scale3d(1.15, 0.85, 1); }
  65% { transform: scale3d(0.95, 1.05, 1); }
  75% { transform: scale3d(1.05, 0.95, 1); }
`;

const trackingBreathe = keyframes`
  0%, 100% { letter-spacing: normal; }
  50% { letter-spacing: 0.15em; }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const wave = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-3px) scale(1.05); }
`;

const pop = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const swing = keyframes`
  0%, 100% { transform: rotate3d(0, 0, 1, 0deg); }
  20% { transform: rotate3d(0, 0, 1, 10deg); }
  40% { transform: rotate3d(0, 0, 1, -8deg); }
  60% { transform: rotate3d(0, 0, 1, 5deg); }
  80% { transform: rotate3d(0, 0, 1, -5deg); }
`;

const blurReveal = keyframes`
  0%, 100% { filter: blur(0); opacity: 1; }
  50% { filter: blur(2px); opacity: 0.8; }
`;

const applyEffect = (effect) => {
  //if (effect !== 0) effect = 16;
  switch (effect) {
    case 1:
      return css`
        animation: ${pulseGlow} 2s infinite ease-in-out;
      `;
    case 2:
      return css`
        animation: ${colorSwirl} 3s infinite linear;
      `;
    case 3:
      return css`
        animation: ${bounceMove} 1s infinite ease-in-out;
      `;
    case 4:
      return css`
        animation:
          ${colorSwirl} 2s infinite linear,
          ${pulseGlow} 1.5s infinite ease-in-out;
      `;
    case 5:
      return css`
        color: #ffd700;
        animation: ${pulseGlow} 1s infinite ease-in-out;
      `;
    case 6:
      return css`
        animation: ${glitchText} 0.4s infinite linear alternate-reverse;
      `;
    case 7:
      return css`
        color: #fff;
        animation: ${neonFlicker} 2s infinite alternate;
      `;
    case 8:
      return css`
        background: linear-gradient(
          90deg,
          #f00,
          #ff0,
          #0f0,
          #0ff,
          #00f,
          #f0f,
          #f00
        );
        background-size: 200% auto;
        color: transparent;
        background-clip: text;
        animation: ${gradientShift} 3s infinite linear;
      `;
    case 9:
      return css`
        animation: ${shake} 0.5s infinite;
      `;
    case 10:
      return css`
        animation: ${floatAnim} 3s infinite ease-in-out;
      `;
    case 11:
      return css`
        color: #fff;
        animation: ${hellfire} 1.5s infinite alternate;
      `;
    case 12:
      return css`
        animation: ${matrixStretch} 2s infinite ease-in-out;
      `;
    case 13:
      return css`
        animation: ${flip3d} 3s infinite linear;
        display: inline-block;
      `;
    case 14:
      return css`
        animation: ${squeeze} 1.5s infinite ease-in-out;
        display: inline-block;
      `;
    case 15:
      return css`
        animation: ${trackingBreathe} 2s infinite ease-in-out;
      `;
    case 16:
      return css`
        background: linear-gradient(
          90deg,
          rgba(255 255 255 / 100%) 0%,
          rgba(255 255 255 / 20%) 50%,
          rgba(255 255 255 / 100%) 100%
        );
        background-size: 200% auto;
        color: transparent;
        background-clip: text;
        animation: ${shimmer} 4s infinite linear;
      `;
    case 17:
      return css`
        animation: ${wave} 1.5s infinite ease-in-out;
        display: inline-block;
      `;
    case 18:
      return css`
        animation: ${pop} 1s infinite ease-in-out;
        display: inline-block;
      `;
    case 19:
      return css`
        animation: ${swing} 2s infinite ease-in-out;
        display: inline-block;
        transform-origin: top center;
      `;
    case 20:
      return css`
        animation: ${blurReveal} 3s infinite ease-in-out;
      `;
    default:
      return '';
  }
};

const NameStyle = styled.div`
  font-family: 'DejaVu Sans Mono', monospace;
  color: ${(props) => (props.$color ? props.$color : '#fff')};
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  cursor: pointer;
  display: inline-block;

  ${(props) => applyEffect(props.$effect)}

  &:hover {
    text-decoration: underline;
  }

  &::after {
    color: #6e6b5e;
    content: ':';
  }

  @media (width >= 768px) {
    flex-shrink: 0;
    width: 220px;
    text-align: right;
    margin-right: 1em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &::after {
      content: '';
    }
  }
`;

export default NameStyle;
