/**
 * Exports a styled button
 */

import styled from 'styled-components';

const getBgColor = (props) => {
  if (props.$active) return props.theme.palette.background.element;
  return 'transparent';
};

const getColor = (props) => {
  if (props.$active) return props.theme.palette.text.white;
  return props.theme.palette.text.primary;
};

const getBorderColor = (props) => {
  if (props.$active) return props.theme.palette.border.main;
  return props.theme.palette.border.subtle;
};

const getHoverBgColor = (props) => {
  if (props.$isDisabled) return 'transparent';
  return props.theme.palette.background.element;
};

const getHoverBorderColor = (props) => {
  if (props.$isDisabled) return props.theme.palette.border.subtle;
  return props.theme.palette.border.main;
};

const getHoverColor = (props) => {
  if (props.$isDisabled && !props.$active)
    return props.theme.palette.text.primary;
  return props.theme.palette.text.white;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 46px;
  padding: 0.75rem 1.5rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  background-color: ${getBgColor};
  color: ${getColor};
  border: 1px solid ${getBorderColor};
  cursor: ${getCursor};
  opacity: ${getOpacity};
  pointer-events: ${getPointerEvents};

  & > svg {
    margin-left: 8px;
    margin-right: 8px;
  }

  &:hover {
    background-color: ${getHoverBgColor};
    border-color: ${getHoverBorderColor};
    color: ${getHoverColor};
  }
`;
