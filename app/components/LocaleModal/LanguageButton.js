/**
 * Exports a styled button
 */

import styled from 'styled-components';

const getBgColor = (props) => {
  if (props.$active) return props.theme.palette.accent.main;
  return props.theme.palette.border.light;
};

const getColor = (props) => {
  if (props.$active) return props.theme.palette.text.inverse;
  return props.theme.palette.text.primary;
};

const getHoverBgColor = (props) => {
  if (props.$active) return props.theme.palette.accent.hover;
  return props.theme.palette.border.main;
};

export default styled.button.attrs({
  type: 'button',
})`
  cursor: pointer;
  font-family: monospace;
  min-height: 46px;
  padding-left: 23px;
  padding-right: 23px;
  border-radius: 4px;
  border: 1px solid transparent;
  width: 100%;
  margin-top: 0.75rem;
  transition: all 0.2s ease;
  pointer-events: ${(props) => (props.$disabled ? 'none' : 'auto')};
  background-color: ${getBgColor};
  color: ${getColor};
  border-color: ${getBgColor};

  & > svg {
    margin-left: 12px;
    margin-right: 12px;
  }

  &:hover {
    background-color: ${getHoverBgColor};
    border-color: ${getHoverBgColor};
    color: ${getColor};
  }
`;
