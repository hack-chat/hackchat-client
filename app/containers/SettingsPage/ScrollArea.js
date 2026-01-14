/**
 * Exports a styled html div
 */
import styled from 'styled-components';

export default styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
