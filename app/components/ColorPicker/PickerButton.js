/**
 * Exports a styled button
 */

import styled from 'styled-components';

const getBgColor = (props) => props.theme.palette.background.alt;
const getColor = (props) => props.$color || props.theme.palette.text.primary;
const getHoverBgColor = (props) => props.theme.palette.background.elementHover;

const svgFilter =
  'drop-shadow(-1px -1px 0 rgb(0 0 0 / 50%)) ' +
  'drop-shadow(1px -1px 0 rgb(0 0 0 / 50%)) ' +
  'drop-shadow(1px 1px 0 rgb(0 0 0 / 50%)) ' +
  'drop-shadow(-1px 1px 0 rgb(0 0 0 / 50%))';

export default styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${getBgColor};
  border: none;
  width: 100%;
  height: 100%;
  padding: 0;
  cursor: pointer;
  font-size: 1.25em;
  border-radius: 0;
  transition: all 0.2s ease;
  color: ${getColor};
  text-shadow: #000 0 0 2px;

  &:hover {
    background-color: ${getHoverBgColor} !important;
  }

  & > svg {
    filter: ${svgFilter};
  }
`;
