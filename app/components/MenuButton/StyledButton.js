/**
 * Exports a styled button element using ./buttonStyle.js for
 * use in MainButton.js
 */

import styled from 'styled-components';

import buttonStyle from './buttonStyle';

const StyledButton = styled.button`
  ${buttonStyle}
`;

export default StyledButton;
