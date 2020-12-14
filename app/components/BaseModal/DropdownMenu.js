/**
 * Exports a styled `reactstrap` DropdownMenu
 * - https://reactstrap.github.io/components/dropdowns/
 */

import styled from 'styled-components';
import { DropdownMenu } from 'reactstrap';

export default styled(DropdownMenu)`
  background-color: #2a2a49 !important;
  border-image: linear-gradient(to right, #3b7ed0, #9740dd) !important;
  border-image-slice: 1 !important;
  padding: 0 !important;
  border-radius: 0.3rem !important;
`;
