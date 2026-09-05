/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  position: relative;
  width: 100%;
  display: ${(props) => (props.$hide ? 'none' : 'block')};
`;
