/**
 * Exports a styled html li
 */
import styled from 'styled-components';

export default styled.li`
  padding: 0.4rem 0.2rem;
  color: #ddd;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-top: ${(props) => props.$marginTop || '0.3rem'};
  background-color: ${(props) => (props.$isActive ? '#333' : 'transparent')};
  font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};

  &:hover {
    background-color: #333;
  }

  svg {
    margin-right: 8px;
  }
`;
