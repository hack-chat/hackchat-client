/**
 * Exports a styled html link
 */

import styled from 'styled-components';

export default styled.a`
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  font-weight: bold;

  &:hover {
    color: #fff;
  }
`;
