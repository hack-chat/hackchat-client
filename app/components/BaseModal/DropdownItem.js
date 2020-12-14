/**
 * Exports a styled `reactstrap` DropdownItem
 * - https://reactstrap.github.io/components/dropdowns/
 */

import styled from 'styled-components';
import { DropdownItem } from 'reactstrap';

export default styled(DropdownItem)`
  background-color: #2a2a49 !important;
  color: #f5f5f7 !important;
  text-shadow: 1px 1px 0px #000;
  transition: 0.25s;
  cursor: 'pointer';

  &:hover {
    background-color: #3b7ed0 !important;
  }
`;
