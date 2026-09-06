/**
 * Exports a styled span
 */
import styled from 'styled-components';

export default styled.span`
  display: inline-block;
  width: 8px;
  height: 1rem;
  background-color: ${(props) => props.$color};
  margin-right: 0.5em;
  vertical-align: middle;
  box-shadow: 0 0 5px ${(props) => props.$color};
  border-radius: 2px;
`;
