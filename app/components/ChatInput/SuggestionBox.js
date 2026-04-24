/**
 * Exports styled divs
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
  max-width: 618px;
  width: 100%;
  right: 0;
  scrollbar-width: thin;
  scrollbar-color: #4f4d42 #20201d;

  @media (width <= 767px) {
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
