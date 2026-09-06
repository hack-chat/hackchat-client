/**
 * Exports a styled div
 */

import styled, { css } from 'styled-components';

const getPosition = (props) => {
  if (props.$openRight) {
    return css`
      left: calc(100% - 1px);
    `;
  }
  return css`
    right: calc(100% - 1px);
  `;
};

export default styled.div`
  position: absolute;
  top: -1px;
  ${getPosition}
  background-color: ${({ theme }) => theme.palette.background.modal};
  border: 1px solid ${({ theme }) => theme.palette.border.light};
  border-radius: 4px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 50%);
  min-width: 140px;
  z-index: 1101;
`;
