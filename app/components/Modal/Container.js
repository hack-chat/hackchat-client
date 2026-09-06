/**
 * Exports a styled div
 */

import styled from 'styled-components';

const getMaxWidth = (props) => {
  if (props.$wide) return '731px';
  return '500px';
};

export default styled.div`
  position: relative;
  z-index: 11;
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: ${getMaxWidth};
  max-height: 90vh;
  min-height: 150px;
  background-color: ${({ theme }) => theme.palette.background.modal};
  border: 1px solid ${({ theme }) => theme.palette.border.light};
  border-radius: 4px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 50%);
  padding: 0;
  padding-top: 2.5rem;
  overflow: hidden;

  @media (width >= 768px) {
    padding-top: 0;
  }
`;
