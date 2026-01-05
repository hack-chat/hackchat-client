/**
 * Exports a styled html button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  display: block;
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: transparent;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 1.75rem;
  font-weight: bold;
  line-height: 1;
  padding: 0.25rem;
  z-index: 12;

  &:hover {
    color: #fff;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;
