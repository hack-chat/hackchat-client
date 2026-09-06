/**
 * Exports a styled h1
 */

import styled from 'styled-components';

export default styled.h1`
  color: ${({ theme }) => theme.palette.text.primary};
`;
