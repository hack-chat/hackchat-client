/**
 * Exports a styled div
 */

import styled from 'styled-components';

const getBgColor = (props) => {
  if (props.$isActive) return props.theme.palette.background.hover;
  return 'transparent';
};

export default styled.div`
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.palette.text.primary};
  cursor: pointer;
  background-color: ${getBgColor};

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.hover};
  }

  & > span {
    color: ${({ theme }) => theme.palette.text.muted};
    margin-left: 0.5rem;
  }
`;
