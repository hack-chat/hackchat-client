/**
 * Exports a styled `ColorChanger` Button
 */

import styled from 'styled-components';
import ColorChanger from 'components/ColorPicker';

export default styled(ColorChanger)`
  color: #f5f5f7 !important;
  background-color: #343a40 !important;
  border-color: #9740dd !important;
  border-left-color: transparent !important;
  z-index: 2 !important;
  min-width: 40px !important;
`;
