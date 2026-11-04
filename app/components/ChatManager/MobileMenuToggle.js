/**
 * Exports a styled button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.palette.text.white};
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
  }
`;
