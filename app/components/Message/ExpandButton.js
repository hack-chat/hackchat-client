/**
 * Exports a styled button element
 */

import styled from 'styled-components';

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: #8a8a8a;
  cursor: pointer;
  padding: 4px 0 0 0;
  font-size: 0.9em;
  font-family: 'DejaVu Sans Mono', monospace;
  text-decoration: underline;

  &:hover {
    color: #b0b0b0;
  }
`;

export default ExpandButton;
