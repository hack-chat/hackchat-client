/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  padding: 0.5rem 1rem;
  color: #ddd;
  cursor: pointer;
  background-color: ${(props) => (props.$isActive ? '#151513' : 'transparent')};

  &:hover {
    background-color: #151513;
  }

  & > span {
    color: #8a8a8a;
    margin-left: 0.5rem;
  }
`;
