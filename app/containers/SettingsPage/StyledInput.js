/**
 * Exports a styled input
 */

import styled from 'styled-components';

const getBorderColor = (props) => {
  if (props.$invalid) return props.theme.palette.status.danger;
  return props.theme.palette.border.divider;
};

const getFocusBorderColor = (props) => {
  if (props.$invalid) return props.theme.palette.status.danger;
  return props.theme.palette.border.focus;
};

export default styled.input`
  width: 100%;
  min-height: 46px;
  padding: 0 16px;
  background-color: transparent;
  color: ${({ theme }) => theme.palette.text.primary};
  font-family: monospace;
  border: 1px solid ${getBorderColor};
  border-radius: 4px;
  margin-bottom: 12px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${getFocusBorderColor};
  }

  &::placeholder {
    color: ${({ theme }) => theme.palette.text.muted};
  }
`;
