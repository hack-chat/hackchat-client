/**
 * Exports a styled html button
 */
import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  cursor: pointer;
  font-family: monospace;
  min-height: 46px;
  padding-left: 23px;
  padding-right: 23px;
  border-radius: 4px;
  border: 1px solid transparent;
  width: 100%;
  margin-top: 0.75rem;
  background-color: ${(props) => (props.$active ? '#a6a28c' : '#555')};
  color: ${(props) => (props.$active ? '#1e1e1e' : '#ddd')};
  border-color: ${(props) => (props.$active ? '#a6a28c' : '#555')};
  transition: all 0.2s ease;

  &.disabled {
    pointer-events: none;
  }

  & > svg {
    margin-left: 12px;
    margin-right: 12px;
  }

  &:hover {
    background-color: ${(props) => (props.$active ? '#b7b39d' : '#666')};
    border-color: ${(props) => (props.$active ? '#b7b39d' : '#666')};
    color: ${(props) => (props.$active ? '#1e1e1e' : '#ddd')};
  }
`;
