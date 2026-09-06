/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100dvh;
  width: 100vw;
  background-color: transparent;
  color: ${({ theme }) => theme.palette.text.primary};
  overflow: hidden;

  h4 {
    margin-bottom: 24px;
    color: ${({ theme }) => theme.palette.text.secondary};
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;
