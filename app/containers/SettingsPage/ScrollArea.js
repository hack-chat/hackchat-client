/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  width: 100%;
  max-width: ${({ $largeMode }) => ($largeMode ? '750px' : '600px')};
  padding: 20px;
  overflow-y: auto;
  scrollbar-width: none;
  transition: max-width 0.3s ease;

  &::-webkit-scrollbar {
    display: none;
  }
`;
