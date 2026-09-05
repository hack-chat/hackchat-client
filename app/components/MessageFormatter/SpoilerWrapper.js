/**
 * Exports a styled html span
 */
import styled from 'styled-components';

export default styled.span`
  background-color: ${(props) =>
    props.$isRevealed ? 'rgba(0 0 0 / 10%)' : 'rgba(79 77 66 / 77%)'};
  color: ${(props) => (props.$isRevealed ? 'inherit' : 'transparent')};
  border-radius: 3px;
  cursor: pointer;
  padding: 0 2px;
  user-select: ${(props) => (props.$isRevealed ? 'text' : 'none')};
  transition: all 0.2s ease;
`;
