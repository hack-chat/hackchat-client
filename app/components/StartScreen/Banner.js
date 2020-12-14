/**
 * Exports a styled div element, this wraps the top most text
 * of the default application screen
 */

import styled from 'styled-components';

const Banner = styled.pre`
  background: #3b7ed0;
  background: linear-gradient(45deg, #3b7ed0 0%, #9740dd 100%);
  -webkit-background-clip: text; /* stylelint-disable-line */
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  display: inline-block;
  text-align: left;
  margin: 0px auto;
  justify-content: space-between;
  color: #3b7ed0;
  text-shadow: 1px 1px 0px #000;
  border: none;
`;

export default Banner;
