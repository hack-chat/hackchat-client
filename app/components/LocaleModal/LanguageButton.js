/**
 * A styled Button for language selection
 */
import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  cursor: pointer;
  font-family: monospace;
  min-height: 46px;
  color: #f5f5f7;
  padding-left: 23px;
  padding-right: 23px;
  border-radius: 4px;
  border: 1px solid transparent;
  background: #333;

  &.disabled {
    pointer-events: none;
  }

  &:hover {
    background: #4d4d4d;
  }

  & > svg {
    margin-left: 12px;
    margin-right: 12px;
  }

  width: 100%;
  margin-top: 0.75rem;

  background-color: ${(props) => (props.$active ? '#a6a28c' : '#555')};
  color: ${(props) => (props.$active ? '#1e1e1e' : '#ddd')};
  border-color: ${(props) => (props.$active ? '#a6a28c' : '#555')};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.$active ? '#b7b39d' : '#666')};
    border-color: ${(props) => (props.$active ? '#b7b39d' : '#666')};
    color: ${(props) => (props.$active ? '#1e1e1e' : '#ddd')};
  }
`;
