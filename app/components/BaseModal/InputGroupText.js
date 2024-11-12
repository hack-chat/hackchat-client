/**
 * Exports a styled `reactstrap` InputGroupText
 * - https://reactstrap.github.io/components/input-group/
 */

import styled from 'styled-components';
import { InputGroupText } from 'reactstrap';

export default styled(InputGroupText)`
  background-color: #343a40 !important;
  color: #f5f5f7 !important;
  border-color: #3b7ed0;
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;

  & > button {
    color: #f5f5f7 !important;
    margin: 0 auto;
    border: 0 !important;
  }
`;
