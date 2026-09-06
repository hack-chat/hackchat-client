/**
 * Exports a styled div
 */

import styled, { css } from 'styled-components';

export default styled.div`
  position: fixed;
  inset: 0;
  z-index: 1099;

  ${(props) =>
    props.$isMobile &&
    css`
      background-color: rgb(0 0 0 / 70%);
      display: flex;
      align-items: center;
      justify-content: center;
    `}
`;
