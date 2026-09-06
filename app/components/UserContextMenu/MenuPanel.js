/**
 * Exports a styled div
 */

import styled, { css } from 'styled-components';

const getMobileStyles = (props) => {
  if (props.$isMobile) {
    return css`
      position: relative;
      width: 90vw;
      max-width: 320px;
    `;
  }
  return '';
};

export default styled.div.attrs((props) => {
  if (props.$isMobile) {
    return { style: {} };
  }

  return {
    style: {
      top: `${props.$top}px`,
      left: `${props.$left}px`,
    },
  };
})`
  position: absolute;
  z-index: 1100;
  background-color: ${({ theme }) => theme.palette.background.modal};
  border: 1px solid ${({ theme }) => theme.palette.border.light};
  border-radius: 4px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 50%);
  min-width: 140px;

  ${getMobileStyles}
`;
