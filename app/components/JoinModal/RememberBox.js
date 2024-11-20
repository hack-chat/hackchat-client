/**
 * Exports a styled `reactstrap` Button
 * - https://reactstrap.github.io/components/buttons/
 */

import styled from 'styled-components';
import { Input } from 'reactstrap';

export default styled(Input)`
  margin: 0 auto;
  color: #f5f5f7 !important;
  background-color: #343a40 !important;
  min-width: 30px !important;
  min-height: 30px !important;
  margin-left: 5px;
  margin-right: 5px;
  z-index: 1 !important;
  border: solid 1px #9740dd !important;
  border-left: solid 1px #9740dd !important;
  opacity: 0.33;

  &:checked {
    opacity: 1;
  }
`;
