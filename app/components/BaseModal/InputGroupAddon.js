/**
 * Exports a styled `reactstrap` InputGroupAddon
 * - https://reactstrap.github.io/components/input-group/
 */

import styled from 'styled-components';
import { InputGroupAddon } from 'reactstrap';

export default styled(InputGroupAddon)`
  & > span > svg {
    filter: drop-shadow(1px 1px 0px #000);
  }

  & > span {
    color: #f5f5f7 !important;
    background-color: #343a40 !important;

    border: 1px solid #3b7ed0 !important;
    border-right: 0px solid transparent !important;
  }
`;
