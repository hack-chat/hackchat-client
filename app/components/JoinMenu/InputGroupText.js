/**
 * Exports a styled div
 */

import styled from 'styled-components';
import InputGroup from './InputGroup';

export default styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 42px;
  flex-shrink: 0;
  padding: 0;
  margin: 0;
  font-family: monospace;
  font-size: 1.1em;
  background-color: #2a2a2a;
  color: #a6a28c;

  ${InputGroup} > &:first-child {
    border-right: 1px solid #444;
  }

  ${InputGroup} > &:last-child {
    border-left: 1px solid #444;
  }
`;
