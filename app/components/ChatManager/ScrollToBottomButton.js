/**
 * Exports a styled button
 */

import styled, { keyframes } from 'styled-components';

const popIn = keyframes`
  0% { transform: translateY(10px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

export default styled.button.attrs({
  type: 'button',
})`
  position: absolute;
  inset-inline-end: 15px;
  bottom: 25px;
  background-color: ${({ theme }) => theme.palette.background.modal};
  border: 1px solid ${({ theme }) => theme.palette.border.light};
  border-radius: 20px;
  color: ${({ theme }) => theme.palette.text.secondary};
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
  animation: ${popIn} 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;

  &:focus {
    outline: none;
    box-shadow: none !important;
  }

  &:hover {
    color: ${({ theme }) => theme.palette.text.white};
    border-color: ${({ theme }) => theme.palette.border.main};
    transform: translateY(-2px);
    background-color: ${({ theme }) => theme.palette.background.elementHover};
  }

  @media (width <= 320px) {
    inset-inline-end: 5px;
    padding: 6px 12px;
  }
`;
