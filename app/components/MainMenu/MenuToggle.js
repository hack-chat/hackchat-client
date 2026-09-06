/**
 * Exports a styled button
 */

import styled, { css } from 'styled-components';

const getPosition = (props) => {
  if (props.$menuLeft) {
    return css`
      left: 0.25em;
      right: auto;
    `;
  }

  return css`
    right: 0.25em;
    left: auto;
  `;
};

export default styled.button.attrs({
  type: 'button',
})`
  position: fixed;
  top: 1.5rem;
  ${getPosition}
  z-index: 10;
  background: none;
  border: none;
  color: ${({ theme }) => theme.palette.text.white};
  font-size: 24px;
  cursor: pointer;

  @media (width >= 768px) {
    display: none;
  }
`;
