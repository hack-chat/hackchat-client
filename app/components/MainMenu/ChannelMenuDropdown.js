/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  position: absolute;
  top: 100%;
  inset-inline-start: 0;
  margin-top: 0.5rem;
  background-color: ${({ theme }) => theme.palette.background.modal};
  border: 1px solid ${({ theme }) => theme.palette.border.light};
  border-radius: 4px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 50%);
  min-width: 200px;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
