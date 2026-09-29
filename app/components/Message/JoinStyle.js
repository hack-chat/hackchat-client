/**
 * Exports a styled div
 */

import styled from 'styled-components';

const JoinStyle = styled.div`
  color: ${({ theme }) => theme.palette.status.info};
`;

export default JoinStyle;
