/**
 * Exports a styled html button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  position: fixed;
  top: 1.5rem;
  right: 0.25em;
  z-index: 10;
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;

  @media (width >= 768px) {
    display: none;
  }
`;
