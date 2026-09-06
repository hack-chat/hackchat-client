/**
 * Exports a styled button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  position: absolute;
  top: 1rem;
  right: 2rem;
  z-index: 10;
  background: none;
  border: none;
  color: ${({ theme }) => theme.palette.text.muted};
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: normal;

  &:hover {
    color: ${({ theme }) => theme.palette.text.white};
  }
`;
