/**
 * Exports a styled input
 */

import styled from 'styled-components';

const getBgColor = (props) => {
  if (props.checked) return props.theme.palette.accent.main;
  return 'transparent';
};

const getKnobLeft = (props) => {
  if (props.checked) return '25px';
  return '3px';
};

const getKnobBgColor = (props) => {
  if (props.checked) return props.theme.palette.text.inverse;
  return props.theme.palette.text.muted;
};

export default styled.button.attrs({
  type: 'button',
})`
  cursor: pointer;
  width: 50px;
  height: 28px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.palette.border.divider};
  position: relative;
  transition: all 0.2s ease;
  background-color: ${getBgColor};

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${getKnobLeft};
    width: 20px;
    height: 20px;
    background-color: ${getKnobBgColor};
    border-radius: 50%;
    transition: all 0.2s ease;
  }

  &:hover {
    border-color: ${({ theme }) => theme.palette.border.focus};
  }
`;
