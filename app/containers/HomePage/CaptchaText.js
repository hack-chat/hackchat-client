/**
 * Exports a styled pre
 */

import styled from 'styled-components';

export default styled.pre`
  background: ${({ theme }) => theme.palette.background.menu};
  padding: 1rem;
  text-align: center;
  font-size: 0.2rem;
  font-family: monospace;
  color: ${({ theme }) => theme.palette.text.code};
  border-radius: 4px;
  user-select: none;
  -webkit-user-drag: none;
  overflow-x: auto;
`;
