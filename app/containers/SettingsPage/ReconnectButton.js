/**
 * Exports a styled html button
 */

import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  color: #f5f5f7 !important;
  background-color: #343a40 !important;
  border-color: #9740dd !important;
  border-left-color: transparent !important;
  z-index: 1 !important;
`;
