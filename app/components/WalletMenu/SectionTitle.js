/**
 * Exports a styled h3
 */

import styled from 'styled-components';

export default styled.h3`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 1.1em;
  margin-top: 1.2rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.main};
  padding-bottom: 0.3rem;

  &:first-child {
    margin-top: 0;
  }
`;
