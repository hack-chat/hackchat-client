/**
 * Exports a styled div
 */

import styled from 'styled-components';

// Lays out the fixed-width name gutter; the clickable name is NameStyle
const NameColumn = styled.div.attrs({ className: 'nick-column' })`
  @media (width >= 768px) {
    flex-shrink: 0;
    width: 220px;
    text-align: end;
    margin-inline-end: 1em;
  }
`;

export default NameColumn;
