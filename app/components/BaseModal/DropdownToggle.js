/**
 * Exports a styled `reactstrap` DropdownToggler
 * - https://reactstrap.github.io/components/dropdowns/
 */

import styled from 'styled-components';
import { DropdownToggle } from 'reactstrap';

export default styled(DropdownToggle)`
  background-color: rgba(0 0 0 20%) !important;
  color: #f5f5f7;
  text-shadow: 1px 1px 0 #000;
  transition: 0.25s;

  &:hover {
    background-color: rgba(0 0 0 60%) !important;
  }

  &:focus {
    box-shadow: none !important;
    background-color: rgba(125 35 199 40%) !important;
  }
`;
