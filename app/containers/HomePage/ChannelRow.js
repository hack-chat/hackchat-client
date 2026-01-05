/**
 * Exports a styled html div
 */

import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;

  & > div {
    width: 50%;
    padding-left: 1em;
    padding-right: 1em;
  }

  & > div:nth-child(odd) {
    text-align: right;
  }

  & > div > a {
    text-decoration: underline;
  }

  & > div > a:hover {
    text-decoration: none;
    color: #fff;
  }
`;
