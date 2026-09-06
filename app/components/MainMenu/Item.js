/**
 * Exports a styled li
 */
import styled from 'styled-components';

const getBgColor = (props) => {
  if (props.$isActive) return props.theme.palette.background.element;
  return 'transparent';
};

const getFontWeight = (props) => {
  if (props.$isActive) return 'bold';
  return 'normal';
};

export default styled.li`
  padding: 0.4rem 0.2rem;
  color: ${({ theme }) => theme.palette.text.primary};
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-top: ${(props) => props.$marginTop || '0.3rem'};
  background-color: ${getBgColor};
  font-weight: ${getFontWeight};

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.element};
  }

  svg {
    margin-inline-end: 8px;
  }
`;
