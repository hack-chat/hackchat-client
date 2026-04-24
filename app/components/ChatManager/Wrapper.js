/**
 * Exports a styled html div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  height: 0;
  flex: 1;
  overflow: hidden auto;
  min-height: 0;
  scrollbar-width: thin;
  scrollbar-color: #4f4d42 #20201d;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #20201d;
    border-left: 1px solid #4f4d42;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4f4d42;
    border-radius: 4px;
    border: 2px solid #20201d;
  }
`;
