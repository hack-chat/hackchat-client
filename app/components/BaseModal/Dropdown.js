/**
 * Exports a styled `reactstrap` Dropdown
 * - https://reactstrap.github.io/components/dropdowns/
 */

import styled from 'styled-components';
import { Dropdown } from 'reactstrap';

export default styled(Dropdown)`
  color: #f5f5f7;
  text-shadow: 1px 1px 0px #000;
  transition: 0.25s;
  width: 100%;
  border-radius: 0.3rem !important;
`;
