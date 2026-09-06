/**
 * Exports a styled pre
 */

import styled from 'styled-components';

const Banner = styled.pre`
  background: ${({ theme }) => theme.palette.accent.main};
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.palette.accent.main} 0%,
    ${({ theme }) => theme.palette.accent.logoDark} 100%
  );
  -webkit-background-clip: text; /* stylelint-disable-line */
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  display: inline-block;
  text-align: left;
  margin: 0 auto;
  justify-content: space-between;
  color: ${({ theme }) => theme.palette.accent.main};
  text-shadow: 1px 1px 0 #000;
  border: none;
`;

export default Banner;
