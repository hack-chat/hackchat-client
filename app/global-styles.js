/**
 * Root style sheet for the ui
 */

import { createGlobalStyle, keyframes } from 'styled-components';
import thinScrollbar from 'utils/thinScrollbar';

const colorSwirl = keyframes`
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 1; filter: brightness(1); }
  50% { opacity: 0.75; filter: brightness(1.2); }
`;

const bounceMove = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -2px, 0); }
`;

const glitchText = keyframes`
  0% { transform: translate3d(0, 0, 0) }
  20% { transform: translate3d(-2px, 1px, 0) }
  40% { transform: translate3d(-1px, -1px, 0) }
  60% { transform: translate3d(2px, 1px, 0) }
  80% { transform: translate3d(1px, -1px, 0) }
  100% { transform: translate3d(0, 0, 0) }
`;

const neonFlicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
  20%, 24%, 55% { opacity: 0.4; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shake = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  25% { transform: translate3d(-2px, 0, 0) rotate(-1deg); }
  75% { transform: translate3d(2px, 0, 0) rotate(1deg); }
`;

const floatAnim = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -4px, 0); }
`;

const hellfire = keyframes`
  0%, 100% { transform: translateY(0); filter: brightness(1); }
  50% { transform: translateY(-1px); filter: brightness(1.1); }
`;

const matrixStretch = keyframes`
  0%, 100% { transform: scaleY(1); opacity: 1; }
  50% { transform: scaleY(1.1); opacity: 0.8; }
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
  0%, 100% { transform: scaleX(1); }
  50% { transform: scaleX(1.05); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const wave = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(0, -3px, 0) scale(1.05); }
`;

const pop = keyframes`
  0%, 100% { transform: scale3d(1, 1, 1); }
  50% { transform: scale3d(1.1, 1.1, 1); }
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

const GlobalStyle = createGlobalStyle`
  ${({ theme }) => theme.typography?.import || ''}

  html,
  body {
    height: 100dvh;
    margin: 0;
    overflow: hidden;
  }

  body {
    background: ${({ theme }) => theme.palette.background.main};
    color: ${({ theme }) => theme.palette.text.secondary};
    font-size: ${({ theme }) => theme.typography.fontSize};
    tab-size: 4;
  }

  ${thinScrollbar}

  body,
  input,
  textarea,
  button,
  select {
    font-family: ${({ theme }) => theme.typography?.primary || "'DejaVu Sans Mono', monospace"};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing};
  }

  input,
  textarea {
    background: none;
    border: none;
    outline: none;
    resize: none;
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 3px;
    margin-top: 0;
  }

  h4 {
    margin: 1em 0;
    font-weight: bold;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    text-decoration: underline;
  }

  ul, ol {
    display: block;
    margin: 0;
    padding: 0;
    list-style-type: disc;
    margin-block: 1em;
    margin-inline: 0;
    padding-inline-start: 40px;
  }

  ul ul, ol ol {
    padding-inline-start: 2em;
  }

  ul li {
    list-style: inside;
  }

  table {
    color: ${({ theme }) => theme.palette.text.primary};
    background-color: transparent;
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    border-spacing: 0;
    border-collapse: collapse;
  }

  th {
    text-align: left;
  }

  td, th {
    padding: 0;
  }

  table > thead > tr > th,
  table > tbody > tr > th,
  table > tfoot > tr > th,
  table > thead > tr > td,
  table > tbody > tr > td,
  table > tfoot > tr > td {
    padding: 8px;
    line-height: 1.4286;
    vertical-align: top;
    border-top: 1px solid ${({ theme }) => theme.palette.background.tertiary};
  }

  table > thead > tr > th {
    vertical-align: bottom;
    border-bottom: 2px solid ${({ theme }) => theme.palette.background.tertiary};
  }

  table > tbody > tr:nth-child(odd) > td,
  table > tbody > tr:nth-child(odd) > th {
    background-color: ${({ theme }) => theme.palette.background.tertiary};
  }

  table > caption + thead > tr:first-child > th,
  table > colgroup + thead > tr:first-child > th,
  table > thead:first-child > tr:first-child > th,
  table > caption + thead > tr:first-child > td,
  table > colgroup + thead > tr:first-child > td,
  table > thead:first-child > tr:first-child > td {
    border-top: 0;
  }

  img {
    max-width: 50%;
    max-height: 800px;
  }

  pre {
    display: block;
    line-height: 1.4286;
    tab-size: 4;
    white-space: pre-wrap;
    word-break: break-all;
    word-wrap: break-word;
    background-color: ${({ theme }) => theme.palette.background.tertiary};
    border: 1px solid #000;
    border-radius: 4px;
    color: #797979;
    margin: 0 auto;
  }

  code {
    padding: 2px 4px;
    color: #000;
    background-color: ${({ theme }) => theme.palette.background.tertiary};
    border-radius: 4px;
  }

  blockquote {
    padding: 3px 10px;
    margin: 3px;
    border-inline-start: 5px solid ${({ theme }) => theme.palette.background.tertiary};
    overflow-wrap: break-word;
    word-break: break-word;
  }

  blockquote > p {
    margin: 0;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid ${({ theme }) => theme.palette.background.tertiary};
  }

  mark {
    background-color: ${({ theme }) => theme.palette.status.info};
    color: black;
  }

  label {
    vertical-align: 3px;
  }

  :focus-visible {
    outline: 2px dashed ${({ theme }) => theme.palette.border.focus};
    outline-offset: 2px;
  }

  [class*="effect-"] {
    display: inline-block; 
    will-change: transform, filter, opacity;
    transform: translateZ(0); 
  }

  .effect-1 { 
    text-shadow: 0 0 8px currentcolor;
    animation: ${pulseGlow} 2s infinite ease-in-out; 
  }
  .effect-2 { animation: ${colorSwirl} 3s infinite linear; }
  .effect-3 { animation: ${bounceMove} 1s infinite ease-in-out; }
  
  .effect-4 { 
    text-shadow: 0 0 8px currentcolor;
    animation: ${colorSwirl} 2s infinite linear, ${pulseGlow} 1.5s infinite ease-in-out; 
  }

  .effect-5 {
    color: #ffd700;
    text-shadow: 0 0 8px currentcolor;
    animation: ${pulseGlow} 1s infinite ease-in-out;
  }

  .effect-6 { animation: ${glitchText} 0.4s infinite linear alternate-reverse; }

  .effect-7 {
    color: #fff;
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #0fa, 0 0 40px #0fa, 0 0 80px #0fa;
    animation: ${neonFlicker} 2s infinite alternate;
  }

  .effect-8 {
    background: linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
    background-size: 200% auto;
    color: transparent;
    background-clip: text;
    animation: ${gradientShift} 3s infinite linear;
  }

  .effect-9 { animation: ${shake} 0.5s infinite; }
  .effect-10 { animation: ${floatAnim} 3s infinite ease-in-out; }

  .effect-11 {
    color: #fff;
    text-shadow: 0 -1px 4px #ff3, 0 -2px 10px #ff8000, 0 -10px 20px #ff4136;
    animation: ${hellfire} 1.5s infinite alternate;
  }

  .effect-12 { 
    color: #0f0; 
    text-shadow: 0 0 10px #0f0;
    animation: ${matrixStretch} 2s infinite ease-in-out; 
  }

  .effect-13 { animation: ${flip3d} 3s infinite linear; }
  .effect-14 { animation: ${squeeze} 1.5s infinite ease-in-out; }
  .effect-15 { animation: ${trackingBreathe} 2s infinite ease-in-out; }

  .effect-16 {
    background: linear-gradient(90deg, rgba(255 255 255 / 100%) 0%, rgba(255 255 255 / 20%) 50%, rgba(255 255 255 / 100%) 100%);
    background-size: 200% auto;
    color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s infinite linear;
  }

  .effect-17 { animation: ${wave} 1.5s infinite ease-in-out; }
  .effect-18 { animation: ${pop} 1s infinite ease-in-out; }
  
  .effect-19 {
    animation: ${swing} 2s infinite ease-in-out;
    transform-origin: top center;
  }

  .effect-20 { animation: ${blurReveal} 3s infinite ease-in-out; }

  .gpu-accelerate {
    will-change: transform, filter, opacity;
    transform: translateZ(0); 
  }

  ${({ theme }) => theme.customCss || ''}
`;

export default GlobalStyle;
