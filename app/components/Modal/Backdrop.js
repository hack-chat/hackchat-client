/**
 * Exports a styled html div
 */

import styled from 'styled-components';

export default styled.div`
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0 0 0 / 50%);
  display: flex;
  justify-content: center;
  align-items: center;

  &[hidden] {
    display: none;
  }
`;
