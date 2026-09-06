/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  margin-top: 14px;
  margin-right: 12px;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
`;
