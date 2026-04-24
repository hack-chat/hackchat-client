/**
 * Exports a styled html div
 */

import styled from 'styled-components';

const NickPlaceholder = styled.div`
  display: none;

  @media (width >= 768px) {
    display: block;
    width: 220px;
    margin-right: 1em;
    flex-shrink: 0;
  }
`;
export default NickPlaceholder;
