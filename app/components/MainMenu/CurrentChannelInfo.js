/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.white};
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.main};

  span {
    display: block;
    font-size: 0.9em;
    font-weight: normal;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;
