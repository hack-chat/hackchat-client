/**
 * Exports a styled div element, this wraps the message portion
 * of an info event
 */

import styled from 'styled-components';

const InfoStyle = styled.div`
  color: #60ac39;
  font-family: 'DejaVu Sans Mono', monospace;
  padding-top: 0.25em;
  padding-bottom: 0.25em;

  & > p {
    margin: 0;
  }

  & > a,
  & > p > a,
  & > p > span > a {
    color: #a6a28c;
  }
`;

export default InfoStyle;
