/**
 * Exports a styled html div
 */
import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(125, 122, 104, 0.2);
  font-family: monospace;
  color: #f5f5f7;
  cursor: pointer;
  padding-left: 1em;
  padding-right: 1em;

  &:nth-child(even) {
    background-color: #2a2a2a;
  }

  &:hover {
    background-color: #151513;
  }

  &:last-child {
    border-bottom: none;
  }

  div.channel-info {
    display: flex;
    align-items: center;

    svg {
      margin-right: 12px;
      color: #a6a28c;
    }
  }
`;
