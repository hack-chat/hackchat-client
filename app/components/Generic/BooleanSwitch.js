/**
 * Exports a styled input
 */

import styled from 'styled-components';

const getBgColor = (props) => {
  if (props.checked) return props.theme.palette.accent.main;
  return 'transparent';
};

const getKnobLeft = (props) => {
  if (props.checked) return '1.5625em';
  return '0.1875em';
};

const getKnobBgColor = (props) => {
  if (props.checked) return props.theme.palette.text.inverse;
  return props.theme.palette.text.muted;
};

export default styled.button.attrs({
  type: 'button',
})`
  font-size: inherit;
  cursor: pointer;
  width: 3.125em;
  height: 1.75em;
  border-radius: 1em;
  border: 1px solid ${({ theme }) => theme.palette.border.divider};
  position: relative;
  transition: all 0.2s ease;
  background-color: ${getBgColor};

  &::after {
    content: '';
    position: absolute;
    top: 0.1875em;
    left: ${getKnobLeft};
    width: 1.25em;
    height: 1.25em;
    background-color: ${getKnobBgColor};
    border-radius: 50%;
    transition: all 0.2s ease;
  }

  &:hover {
    border-color: ${({ theme }) => theme.palette.border.focus};
  }
`;
