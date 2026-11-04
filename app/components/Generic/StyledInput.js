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
  padding-inline: 16px;
  border-radius: 4px;
  font-size: inherit;
  font-family: ${(props) => props.theme.typography.primary};
  transition: all 0.2s ease;
  background-color: ${getBgColor};
  color: ${getColor};
  border: 1px solid ${getBorderColor};
  cursor: ${getCursor};
  opacity: ${getOpacity};
  pointer-events: ${getPointerEvents};

  &::placeholder {
    color: ${({ theme }) => theme.palette.text.muted};
  }

  &:is(select) {
    width: 50%;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238a8a8a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-size: 1.5em;
    background-position: right 1.5em center;
  }

  &:hover {
    border-color: ${getHoverBorderColor};
  }

  &:focus {
    outline: none;
    border-color: ${getFocusBorderColor};
    background-color: ${({ theme }) => theme.palette.background.element};
  }

  [dir='rtl'] &:is(select) {
    background-position: left 1.5em center;
  }
`;
