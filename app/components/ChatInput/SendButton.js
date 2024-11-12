/**
 * Exports a styled `reactstrap` Button
 * - https://reactstrap.github.io/components/buttons/
 */

import styled from 'styled-components';
import { Button } from 'reactstrap';

export default styled(Button)`
  color: #f5f5f7 !important;
  background-color: #343a40 !important;
  border: 1px solid #9740dd !important;
  border-left: 0 solid transparent !important;

  &:focus {
    box-shadow: none !important;
  }

  & > svg {
    filter: drop-shadow(1px 1px 0 #000);
  }
`;
