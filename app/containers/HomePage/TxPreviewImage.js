/**
 * Exports a styled img
 */

import styled from 'styled-components';

export default styled.img`
  width: 150px;
  min-width: 150px;
  height: 150px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0 0 0 / 50%);
  margin: 1em;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  flex-shrink: 0;
  object-fit: cover;

  &:hover {
    transform: scale(1.05);
  }
`;
