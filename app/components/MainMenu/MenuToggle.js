/**
 * A toggle button (hamburger icon) used to open the MainMenu
 * on mobile screen sizes. It is hidden on desktop.
 */
import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  position: fixed;
  top: 0.25em;
  right: 0.25em;
  z-index: 10;
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;
