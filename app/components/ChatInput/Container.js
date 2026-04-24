/**
 * Exports a styled form
 */
import styled from 'styled-components';

export default styled.form`
  position: relative;
  display: flex;
  width: 100%;

  &::before {
    content: '';
    display: none;

    @media (width >= 768px) {
      display: block;
      flex-shrink: 0;
      width: 220px;
      margin-right: 1em;
    }
  }
`;
