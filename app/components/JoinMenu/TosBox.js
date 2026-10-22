/**
 * Exports a styled div
 */

import styled from 'styled-components';

const getBgColor = (props) => {
  if (props.$isChecked) return props.theme.palette.accent.main;
  return props.theme.palette.background.alt;
};

const getBorderColor = (props) => {
  if (props.$isChecked) return props.theme.palette.accent.main;
  return props.theme.palette.border.light;
};

const getHoverBorderColor = (props) => {
  if (props.$isChecked) return props.theme.palette.accent.main;
  return props.theme.palette.text.muted;
};

const getContent = (props) => {
  if (props.$isChecked) return '\\2714';
  return '';
};

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-color: ${getBgColor};
  border: 1px solid ${getBorderColor};
  border-radius: 4px;
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 1.25em;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${getHoverBorderColor};
  }

  &::after {
    content: '${getContent}';
    color: ${({ theme }) => theme.palette.text.inverse};
  }
`;
