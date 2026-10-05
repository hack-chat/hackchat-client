/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.palette.status.error};
  margin-bottom: 20px;

  & > svg {
    font-size: 3rem;
    margin-bottom: 10px;
  }

  & > h3 {
    margin: 0;
    font-size: 1.4em;
    font-weight: bold;
  }
`;
