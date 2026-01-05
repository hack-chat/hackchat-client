/**
 * Exports a styled html button
 */
import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  display: none;
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: transparent;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  z-index: 10;

  &:hover {
    color: #fff;
  }

  @media (min-width: 768px) {
    display: block;
  }
`;
