/**
 * Exports a styled `reactstrap` Toast
 * - https://reactstrap.github.io/components/toasts/
 */

import styled from 'styled-components';
import { Toast } from 'reactstrap';

export default styled(Toast)`
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 15px;
  background-color: none !important;
  border: none !important;
  box-shadow: 0 0 10px #000000;
`;
