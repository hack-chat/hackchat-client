/**
 * Exports a styled button
 */

import styled from 'styled-components';

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.palette.text.muted};
  cursor: pointer;
  padding: 4px 0 0;
  font-size: 0.9em;
  font-family: 'DejaVu Sans Mono', monospace;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

export default ExpandButton;
