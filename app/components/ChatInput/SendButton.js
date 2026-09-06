/**
 * Exports a styled button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 1.2em;
  padding: 5px 12px;
  border-top: 1px solid ${({ theme }) => theme.palette.border.divider};

  &:focus {
    outline: none;
    box-shadow: none !important;
  }

  &:hover {
    color: ${({ theme }) => theme.palette.text.primary};
  }

  & > svg {
    filter: drop-shadow(1px 1px 0 #000);
  }
`;
