/**
 * Exports a styled div element, this wraps the trip portion
 * of a normal chat message event
 */

import styled from 'styled-components';

const UserTrip = styled.span`
  color: #6e6b5e;
  padding-right: 0.5em;
  font-size: 0.7rem;
  margin-left: -100%;
  font-family: 'DejaVu Sans Mono', monospace;
`;

const ModTrip = styled.span`
  color: #6e6b5e;
  padding-right: 0.5em;
  font-size: 0.7rem;
  margin-left: -100%;
  font-family: 'DejaVu Sans Mono', monospace;

  &::before {
    content: '⭐';
    z-index: 1;
    transition: 0.2s;
  }
`;

const AdminTrip = styled.span`
  color: #6e6b5e;
  padding-right: 0.5em;
  font-size: 0.7rem;
  margin-left: -100%;
  font-family: 'DejaVu Sans Mono', monospace;

  &::before {
    content: '👑';
    z-index: 1;
    transition: 0.2s;
  }
`;

export { UserTrip, ModTrip, AdminTrip };
