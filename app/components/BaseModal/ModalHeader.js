/**
 * Exports a styled `reactstrap` ModalHeader
 * - https://reactstrap.github.io/components/modals/
 */

import styled from 'styled-components';
import { ModalHeader } from 'reactstrap';

export default styled(ModalHeader)`
  background: #3b7ed0;
  background: linear-gradient(to right, #3b7ed0 0%, #9740dd 100%);
  border: none !important;
  padding: 0.5rem 0.5rem !important;
  color: #f5f5f7;
  text-shadow: 1px 1px 0px #000;
`;
