/**
 * Exports a styled button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.palette.accent.main};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: inherit;

  &:hover {
    text-decoration: underline;
  }
`;
