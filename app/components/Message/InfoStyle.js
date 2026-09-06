/**
 * Exports a styled div
 */

import styled from 'styled-components';

const InfoStyle = styled.div`
  color: ${({ theme }) => theme.palette.status.info};
  font-family: 'DejaVu Sans Mono', monospace;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  width: 98%;

  & > p {
    margin: 0;
  }

  & > a,
  & > p > a,
  & > p > span > a {
    color: ${({ theme }) => theme.palette.accent.main};
  }
`;

export default InfoStyle;
