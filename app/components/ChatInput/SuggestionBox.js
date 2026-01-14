/**
 * Exports a styled div for displaying command suggestions.
 */
import styled from 'styled-components';

export const SuggestionContainer = styled.div`
  position: absolute;
  bottom: 100%;
  background-color: #1e1e1e;
  border: 1px solid #444;
  border-bottom: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  max-width: 600px;
  width: 100%;
  left: 0;
  right: 0;

  @media (min-width: 768px) {
    left: calc(220px + 1em);
    right: auto;
  }
`;

export const SuggestionItem = styled.div`
  padding: 0.5rem 1rem;
  color: #ddd;
  cursor: pointer;

  &:hover,
  &.active {
    background-color: #151513;
  }

  & > span {
    color: #8a8a8a;
    margin-left: 0.5rem;
  }
`;
