/**
 * Exports a styled `reactstrap` Input
 * - https://reactstrap.github.io/components/input-group/
 */

import styled from 'styled-components';
import { Input } from 'reactstrap';

export default styled(Input)`
  color: #f5f5f7 !important;
  background-color: #343a40 !important;
  border-right: 0 solid transparent !important;
  border-image: linear-gradient(to right, #3b7ed0, #9740dd) !important;
  border-image-slice: 1 !important;
  max-height: 125px;
  height: auto;
  resize: none;

  &:focus {
    background: linear-gradient(to right, #3e444c, #343a40) !important;
  }
`;
