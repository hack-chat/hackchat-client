/**
 * Exports a styled h3 element
 */

import styled from 'styled-components';

export default styled.h3`
  color: #a6a28c;
  font-size: 1.1em;
  margin-top: 1.2rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #444;
  padding-bottom: 0.3rem;

  &:first-child {
    margin-top: 0;
  }
`;
