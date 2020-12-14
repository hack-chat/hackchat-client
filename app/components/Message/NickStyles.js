/**
 * Exports a styled div element, this wraps the name portion
 * of a normal chat message event
 */

import styled from 'styled-components';

const UserNick = styled.div`
  text-align: right;
  color: ${(props) => (props.color ? props.color : '#3b7ed0')};
  margin-right: 1em;
  font-size: 0.9rem;
  white-space: nowrap;
  font-family: 'DejaVu Sans Mono', monospace;
`;

const ModNick = styled.div`
  text-align: right;
  color: ${(props) => (props.color ? props.color : '#9740dd')};
  margin-right: 1em;
  font-size: 0.9rem;
  white-space: nowrap;
  font-family: 'DejaVu Sans Mono', monospace;
`;

const AdminNick = styled.div`
  text-align: right;
  color: ${(props) => (props.color ? props.color : '#d73737')};
  color: #;
  margin-right: 1em;
  font-size: 0.9rem;
  white-space: nowrap;
  font-family: 'DejaVu Sans Mono', monospace;
`;

export { UserNick, ModNick, AdminNick };
