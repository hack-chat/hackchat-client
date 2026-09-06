/**
 * Exports a styled button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  display: block;
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.palette.text.muted};
  cursor: pointer;
  font-size: 1.75rem;
  font-weight: bold;
  line-height: 1;
  padding: 0.25rem;
  z-index: 12;

  &:hover {
    color: ${({ theme }) => theme.palette.text.white};
  }

  @media (width >= 768px) {
    display: none;
  }
`;
