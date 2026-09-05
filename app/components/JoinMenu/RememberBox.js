/**
 * Exports a styled html div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-color: ${(props) => (props.$isChecked ? '#a6a28c' : '#2a2a2a')};
  border: 1px solid ${(props) => (props.$isChecked ? '#a6a28c' : '#555')};
  border-radius: 4px;
  color: #ddd;
  font-size: 1.25em;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => (props.$isChecked ? '#a6a28c' : '#888')};
  }

  &::after {
    content: '${(props) => (props.$isChecked ? '\\2714' : '')}';
    color: #1e1e1e;
  }
`;
