/**
 * Exports a styled button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  display: none;
  position: absolute;
  top: 1rem;
  right: 0.75rem;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.palette.text.muted};
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  z-index: 10;

  &:hover {
    color: ${({ theme }) => theme.palette.text.white};
  }

  @media (width >= 768px) {
    display: block;
  }
`;
