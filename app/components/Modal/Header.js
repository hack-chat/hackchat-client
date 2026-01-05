/**
 * Exports a styled html div
 */

import styled from 'styled-components';

export default styled.div`
  color: #a6a28c;
  font-size: 1.2em;
  font-weight: bold;
  border-bottom: 1px solid #444;
  padding: 1rem;
  padding-right: 3rem;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  svg {
    margin-right: 0.5rem;
  }

  @media (min-width: 768px) {
    padding-right: 1rem;
  }
`;
