/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  text-align: center;
  margin-top: ${({ $hasImage }) => ($hasImage ? '0' : '0.5rem')};
`;
