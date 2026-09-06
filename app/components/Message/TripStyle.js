/**
 * Exports a styled span
 */

import styled, { css } from 'styled-components';

const getFlair = (props) => {
  if (props.$flair) {
    return css`
      &::before {
        content: '${props.$flair} ';
      }
    `;
  }
  return '';
};

const TripStyle = styled.span`
  color: ${({ theme }) => theme.palette.text.trip};
  display: inline-block;
  margin-inline-end: 0.5em;
  font-size: 0.7rem;
  font-family: 'DejaVu Sans Mono', monospace;

  ${getFlair}
`;

export default TripStyle;
