/**
 * Exports a styled button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.7em;
  height: 1.7em;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.palette.text.muted};
  cursor: pointer;
  font-size: 1.25rem;
  flex-shrink: 0;
  font-weight: normal;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  margin-inline-end: ${(props) => (props.$alignRight ? '-0.5rem' : '0')};

  &:hover {
    color: ${({ theme }) => theme.palette.text.white};
    background-color: rgba(255 255 255 / 8%);
  }
`;
