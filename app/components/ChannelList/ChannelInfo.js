/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 12px;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;
