/**
 * Exports a styled html input
 */
import styled from 'styled-components';

export default styled.input`
  padding: 0.5rem;
  width: 80%;
  margin: ${(props) => props.$margin || '1rem 0 2rem 0'};
  font-family: monospace;
  text-align: center;
  font-size: 1.25rem;
`;
