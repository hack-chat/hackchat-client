/**
 * Exports a styled button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.palette.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  font-size: 1.1rem;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
  transform: ${({ $isRotated }) => ($isRotated ? 'rotate(180deg)' : 'none')};

  &:hover {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;
