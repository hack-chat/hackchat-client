/**
 * Exports a styled div element, this wraps the message portion
 * of an invite event
 */

import styled from 'styled-components';

const InviteStyle = styled.div`
  color: #60ac39;
  font-family: 'DejaVu Sans Mono', monospace;

  & > a {
    color: #fff;
  }
`;

export default InviteStyle;
