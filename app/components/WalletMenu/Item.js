/**
 * Exports a styled li
 */

import styled from 'styled-components';

const getCursor = (props) => {
  if (props.$isDisabled) return 'not-allowed';
  return 'pointer';
};

const getOpacity = (props) => {
  if (props.$isDisabled) return 0.5;
  return 1;
};

const getBgColor = (props) => {
  if (props.$isActive) return props.theme.palette.background.element;
  return 'transparent';
};

const getFontWeight = (props) => {
  if (props.$isActive) return 'bold';
  return 'normal';
};

const getHoverBgColor = (props) => {
  if (props.$isDisabled) return 'transparent';
  return props.theme.palette.background.element;
};

export default styled.li`
  padding: 0.8rem 0.5rem;
  color: ${({ theme }) => theme.palette.text.primary};
  border-radius: 4px;
  display: flex;
  align-items: center;
  font-size: 1.1em;
  cursor: ${getCursor};
  opacity: ${getOpacity};
  background-color: ${getBgColor};
  font-weight: ${getFontWeight};

  &:hover {
    background-color: ${getHoverBgColor};
  }

  svg {
    margin-right: 8px;
  }
`;
