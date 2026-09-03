/**
 * Exports a styled html span
 */

import styled from 'styled-components';

const TripStyle = styled.span`
  color: #6e6b5e;
  display: inline-block;
  margin-inline-end: 0.5em;
  font-size: 0.7rem;
  font-family: 'DejaVu Sans Mono', monospace;

  ${(props) =>
    props.$flair
      ? `
      &::before {
        content: '${props.$flair} ';
      }
    `
      : ''};
`;

export default TripStyle;
