/**
 * Exports a styled `reactstrap` ToastHeader
 * - https://reactstrap.github.io/components/toasts/
 */

import styled from 'styled-components';
import { ToastHeader } from 'reactstrap';

export default styled(ToastHeader)`
  background: #3b7ed0;
  background: linear-gradient(to right, #3b7ed0 0%, #9740dd 100%);
  border: none !important;
  padding: 0.5rem !important;
  color: #f5f5f7 !important;
  text-shadow: 1px 1px 0 #000;

  & small {
    margin-left: 1em;
  }
`;
