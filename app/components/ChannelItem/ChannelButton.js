/**
 * Exports a styled `reactstrap` Button
 * - https://reactstrap.github.io/components/buttons/
 */

import styled from 'styled-components';
import { Button } from 'reactstrap';

export default styled(Button)`
  background-color: rgba(0, 0, 0, 0.2) !important;
  color: #f5f5f7;
  text-shadow: 1px 1px 0px #000;
  transition: 0.25s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6) !important;
  }
`;
