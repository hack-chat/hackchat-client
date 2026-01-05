/**
 * Exports a styled div element, this wraps the trip portion
 * of a normal chat message event
 */

import styled from 'styled-components';

const TripStyle = styled.span`
  color: #6e6b5e;
  padding-right: 0.5em;
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
