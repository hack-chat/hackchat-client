/**
 * Exports a styled div
 */

import styled from 'styled-components';

const getDisplay = (props) => {
  if (props.$hide) return 'none';
  return 'block';
};

export default styled.div`
  position: relative;
  width: 100%;
  display: ${getDisplay};
`;
