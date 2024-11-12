/**
 * Exports a styled `reactstrap` ModalFooter
 * - https://reactstrap.github.io/components/modals/
 */

import styled from 'styled-components';
import { ModalFooter } from 'reactstrap';

export default styled(ModalFooter)`
  background: #38385a;
  background: linear-gradient(to right, #38385a 0%, #47496f 50%, #38385a 100%);
  border-top: none !important;
  border-left: 1px solid #3b7ed0;
  border-right: 1px solid #9740dd;
  padding: 0.5rem !important;
  color: #f5f5f7;
  text-shadow: 1px 1px 0 #000;
`;
