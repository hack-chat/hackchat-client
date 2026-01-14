/**
 * Exports a styled html input
 */
import styled from 'styled-components';

export default styled.input`
  width: 100%;
  min-height: 46px;
  padding: 0 16px;
  background-color: transparent;
  color: #f5f5f7;
  font-family: monospace;
  border: 1px solid rgba(125 122 104 / 50%);
  border-radius: 4px;
  margin-bottom: 12px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #a6a28c;
  }

  &::placeholder {
    color: #8a8a8a;
  }

  &.is-invalid {
    border-color: #ff6b6b;
  }
`;
