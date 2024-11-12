/**
 * Exports the default style for the StyledButton
 */

import { css } from 'styled-components';

const buttonStyles = css`
  width: 40px;
  height: 40px;
  padding: 0;
  margin-bottom: 16px;
  border-image: linear-gradient(to right, #2a65ac, #9740dd) !important;
  border-image-slice: 1 !important;
  font-size: 20px;
  line-height: 1;
  background: #3b7ed0;
  color: #f5f5f7;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  text-align: center;
  outline: none;
  white-space: nowrap;
  overflow: hidden;

  & > svg {
    filter: drop-shadow(1px 1px 0 #000);
  }

  &:hover {
    color: #aaa;
  }

  &:focus {
    outline: none;
  }

  &:active {
    background: rgba(125 35 199 100%);
  }
`;

export default buttonStyles;
