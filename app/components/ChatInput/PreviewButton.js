/**
 * Exports a styled html button
 */
import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  position: absolute;
  inset-inline-end: 15px;
  top: -44px;
  background-color: rgb(42 42 42 / 85%);
  border: 1px solid #555;
  border-radius: 20px;
  color: #a6a28c;
  font-size: 1.5em;
  padding: 4px 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgb(0 0 0 / 40%);
  transition: all 0.2s ease;
  z-index: 10;
  backdrop-filter: blur(4px);

  &:focus {
    outline: none;
    box-shadow: none !important;
  }

  &:hover {
    color: #fff;
    border-color: #777;
    transform: translateY(-2px);
    background-color: rgb(60 60 60 / 95%);
  }

  @media (width <= 320px) {
    inset-inline-end: 5px;
    padding: 6px 12px;
  }
`;
