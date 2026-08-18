/**
 * Exports a styled html div
 */

import styled, { css } from 'styled-components';

export default styled.div`
  position: absolute;
  top: -1px;
  ${(props) =>
    props.$openRight
      ? css`
          left: calc(100% - 1px);
        `
      : css`
          right: calc(100% - 1px);
        `}
  background-color: #2a2a2a;
  border: 1px solid #555;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 50%);
  min-width: 140px;
  z-index: 1101;
`;
