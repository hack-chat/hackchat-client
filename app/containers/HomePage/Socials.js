/**
 * Exports a styled html div
 */

import styled from 'styled-components';

export default styled.div`
  padding-top: 2em;
  display: flex;
  justify-content: space-evenly;
  max-width: 50vw;

  & > a {
    font-size: 2em;
    padding-left: 6px;
    padding-right: 6px;
  }

  & > a:hover {
    color: #fff;
  }
`;
