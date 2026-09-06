/**
 * Exports a styled button
 */
import styled from 'styled-components';

const getBgColor = (props) => {
  if (props.$active) return props.theme.palette.accent.main;
  return props.theme.palette.background.tertiary;
};

const getColor = (props) => {
  if (props.$active) return props.theme.palette.text.inverse;
  return props.theme.palette.text.primary;
};

const getHoverBgColor = (props) => {
  if (props.$active) return props.theme.palette.accent.hover;
  if (props.$isDisabled) return props.theme.palette.background.element;
  return props.theme.palette.border.light;
};

const getCursor = (props) => {
  if (props.$isDisabled) return 'not-allowed';
  return 'pointer';
};

const getOpacity = (props) => {
  if (props.$isDisabled) return 0.5;
  return 1;
};

const getPointerEvents = (props) => {
  if (props.$isDisabled) return 'none';
  return 'auto';
};

export default styled.button.attrs({
  type: 'button',
})`
  font-family: monospace;
  min-height: 46px;
  padding-left: 23px;
  padding-right: 23px;
  border-radius: 4px;
  border: 1px solid transparent;
  margin-top: 0.75rem;
  transition: all 0.2s ease;
  background-color: ${getBgColor};
  color: ${getColor};
  border-color: ${getBgColor};
  cursor: ${getCursor};
  opacity: ${getOpacity};
  pointer-events: ${getPointerEvents};

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
