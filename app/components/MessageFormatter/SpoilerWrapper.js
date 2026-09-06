/**
 * Exports a styled span
 */
import styled from 'styled-components';

const getBgColor = (props) => {
  if (props.$isRevealed) return props.theme.palette.status.spoilerReveal;
  return props.theme.palette.status.spoiler;
};

const getColor = (props) => {
  if (props.$isRevealed) return 'inherit';
  return 'transparent';
};

const getUserSelect = (props) => {
  if (props.$isRevealed) return 'text';
  return 'none';
};

export default styled.span`
  background-color: ${getBgColor};
  color: ${getColor};
  border-radius: 3px;
  cursor: pointer;
  padding: 0 2px;
  user-select: ${getUserSelect};
  transition: all 0.2s ease;
`;
