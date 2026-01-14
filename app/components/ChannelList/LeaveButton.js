/**
 * Exports a styled html button
 */
import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: 1px solid rgba(125, 122, 104, 0.5);
  color: #ff6b6b;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 107, 107, 0.1);
    border-color: #ff6b6b;
  }

  svg {
    font-size: 1.1em;
  }
`;
