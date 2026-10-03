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

// the class is a stable hook for theme customCss
const TripStyle = styled.span.attrs({ className: 'trip' })`
  color: ${({ theme }) => theme.palette.text.trip};
  display: inline-block;
  margin-inline-end: 0.5em;
  font-size: 0.7rem;

  ${getFlair}
`;

export default TripStyle;
