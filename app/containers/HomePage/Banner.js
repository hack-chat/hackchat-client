/**
 * Exports a styled div element, this wraps the top most text
 * of the default application screen
 */

import styled from 'styled-components';

const Banner = styled.pre`
  background: #a6a28c;
  background: linear-gradient(45deg, #a6a28c 0%, #292820ff 100%);
  -webkit-background-clip: text; /* stylelint-disable-line */
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  display: inline-block;
  text-align: left;
  margin: 0 auto;
  justify-content: space-between;
  color: #a6a28c;
  text-shadow: 1px 1px 0 #000;
  border: none;
`;

export default Banner;
