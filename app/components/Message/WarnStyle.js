/**
 * Exports a styled div element, this wraps the message portion
 * of a warning event
 */

import styled from 'styled-components';

const WarnStyle = styled.div`
  border-left: 1px solid #386498 !important;
  color: #f04747;
  padding-left: 1em;

  font-size: 0.9rem;
  font-weight: 200;
  font-family: 'DejaVu Sans Mono', monospace;
`;

export default WarnStyle;
