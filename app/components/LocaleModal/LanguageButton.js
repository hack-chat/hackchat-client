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
  if (props.$disabled) return 'transparent';
  return props.theme.palette.background.element;
};

const getHoverBorderColor = (props) => {
  if (props.$disabled) return props.theme.palette.border.subtle;
  return props.theme.palette.border.main;
};

const getHoverColor = (props) => {
  if (props.$disabled && !props.$active)
    return props.theme.palette.text.primary;
  return props.theme.palette.text.white;
};

export default styled.button.attrs({
  type: 'button',
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 320px;
  min-height: 46px;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  transition: all 0.2s ease;
  background-color: ${getBgColor};
  color: ${getColor};
  border: 1px solid ${getBorderColor};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.$disabled ? '0.5' : '1')};
  pointer-events: ${(props) => (props.$disabled ? 'none' : 'auto')};

  & > svg {
    margin-left: 12px;
    margin-right: 12px;
  }

  &:hover {
    background-color: ${getHoverBgColor};
    border-color: ${getHoverBorderColor};
    color: ${getHoverColor};
  }
`;
