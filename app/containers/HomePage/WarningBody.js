/**
 * Exports a styled div
 */

import styled from 'styled-components';

export default styled.div`
  text-align: center;
  margin-bottom: 25px;
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 1em;
  line-height: 1.5;
`;
