/**
 * Exports a styled html div
 */

import styled, { css } from 'styled-components';

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
  background-color: #2a2a2a;
  border: 1px solid #555;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 50%);
  min-width: 140px;

  ${(props) =>
    props.$isMobile &&
    css`
      position: relative;
      width: 90vw;
      max-width: 320px;
    `}
`;
