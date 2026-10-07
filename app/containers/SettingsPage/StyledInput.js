/**
 * Exports a styled input
 */

import styled from 'styled-components';

const getBgColor = (props) => {
  if (props.$isDisabled)
    return props.theme.palette.background.disabled || 'transparent';
  return 'transparent';
};

const getColor = (props) => props.theme.palette.text.primary;

const getBorderColor = (props) => {
  if (props.$invalid) return props.theme.palette.status.danger;
  return props.theme.palette.border.subtle;
};

const getHoverBorderColor = (props) => {
  if (props.$isDisabled) return props.theme.palette.border.subtle;
  if (props.$invalid) return props.theme.palette.status.danger;
  return props.theme.palette.border.main;
};

const getFocusBorderColor = (props) => {
  if (props.$invalid) return props.theme.palette.status.danger;
  return props.theme.palette.border.focus;
};

const getCursor = (props) => {
  if (props.$isDisabled) return 'not-allowed';
  return 'text';
};

const getOpacity = (props) => {
  if (props.$isDisabled) return 0.5;
  return 1;
};

const getPointerEvents = (props) => {
  if (props.$isDisabled) return 'none';
  return 'auto';
};

export default styled.input`
  width: 100%;
  min-height: 46px;
  padding: 0 16px;
  border-radius: 4px;
  margin-bottom: 12px;
  transition: all 0.2s ease;
  background-color: ${getBgColor};
  color: ${getColor};
  border: 1px solid ${getBorderColor};
  cursor: ${getCursor};
  opacity: ${getOpacity};
  pointer-events: ${getPointerEvents};

  &:hover {
    border-color: ${getHoverBorderColor};
  }

  &:focus {
    outline: none;
    border-color: ${getFocusBorderColor};
    background-color: ${({ theme }) => theme.palette.background.element};
  }

  &::placeholder {
    color: ${({ theme }) => theme.palette.text.muted};
  }
`;
