/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 1rem;
  background-color: transparent;
  border: 1px solid #555;
  border-radius: 4px;
  overflow: hidden;
  min-height: 42px;

  &.hide {
    display: none;
  }

  &:focus-within {
    border-color: #a6a28c;
    box-shadow: 0 0 0 1px #a6a28c;
  }
`;
