/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    padding: 10px 14px;
    border-radius: 6px;
    margin-bottom: 4px;
  }

  & > *:nth-child(odd) {
    background-color: ${({ theme }) => theme.palette.background.element};
  }
`;
