/**
 * Exports a thin, low-contrast scrollbar mixin for styled components
 */

import { css } from 'styled-components';

// The 10px gutter keeps it easy to grab, while the transparent border leaves
// a 4px visible thumb that sits 3px off the content and widens on hover.
// Blink ignores ::-webkit-scrollbar once scrollbar-width or scrollbar-color
// is set, so the standard properties are only used where the pseudo-elements
// are unsupported (Firefox).
const thinScrollbar = css`
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-corner {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.palette.scrollbar.menuThumb};
    background-clip: padding-box;
    border: 3px solid transparent;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover,
  &::-webkit-scrollbar-thumb:active {
    background-color: ${({ theme }) => theme.palette.scrollbar.thumb};
    border-width: 2px;
  }

  @supports not selector(::-webkit-scrollbar) {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.palette.scrollbar.menuThumb}
      transparent;
  }
`;

export default thinScrollbar;
