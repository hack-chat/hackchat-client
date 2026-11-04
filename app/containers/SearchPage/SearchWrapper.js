/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.background.main};
  color: ${({ theme }) => theme.palette.text.primary};
  overflow-y: auto;
  padding: 2rem;
  box-sizing: border-box;
`;
