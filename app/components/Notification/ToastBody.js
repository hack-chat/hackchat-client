/**
 * Exports a styled `reactstrap` ToastBody
 * - https://reactstrap.github.io/components/toasts/
 */

import styled from 'styled-components';
import { ToastBody } from 'reactstrap';

export default styled(ToastBody)`
  background: #38385a;
  background: linear-gradient(to right, #38385a 0%, #47496f 50%, #38385a 100%);
  padding: 1rem 0.5rem 0.5rem !important;
  border-left: 1px solid #3b7ed0;
  border-right: 1px solid #9740dd;
  color: #f5f5f7;
  text-shadow: 1px 1px 0 #000;
`;
