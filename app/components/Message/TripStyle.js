/**
 * Exports a styled span
 */

import styled, { css } from 'styled-components';

const getFlair = (props) => {
  if (props.$flair) {
    return css`
      &::before {
        content: attr(data-flair) ' ';
      }
    `;
  }
  return '';
};

const TripStyle = styled.span.attrs(({ $flair }) => ({
  className: 'trip',
  'data-flair': $flair || undefined,
}))`
  color: ${({ theme }) => theme.palette.text.trip};
  display: inline-block;
  margin-inline-end: 0.5em;
  font-size: 0.7rem;

  ${getFlair}
`;

export default TripStyle;
