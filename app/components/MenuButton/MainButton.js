/**
 * Exports a wrapper for the main StyledButton
 */

import styled from 'styled-components';

import buttonStyle from './buttonStyle';

const MainButton = styled.button`
  margin-bottom: 1rem;
  margin-left: 12px;
  ${buttonStyle}
`;

export default MainButton;
