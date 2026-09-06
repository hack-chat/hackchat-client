/**
 * Exports a styled div
 */

import styled from 'styled-components';

const EmoteStyle = styled.div`
  color: ${({ theme }) => theme.palette.status.emote};
  font-family: 'DejaVu Sans Mono', monospace;
`;

export default EmoteStyle;
