/**
 * Exports a styled html div
 */
import styled from 'styled-components';

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(125 122 104 / 20%);
  cursor: pointer;
  user-select: none;

  &:last-child {
    border-bottom: none;
  }
`;
