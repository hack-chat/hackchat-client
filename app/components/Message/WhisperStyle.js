/**
 * Exports a styled div
 */

import styled, { css } from 'styled-components';

import thinScrollbar from 'utils/thinScrollbar';

const getExpandStyles = (props) => {
  if (props.$canExpand && !props.$isExpanded) {
    return css`
      max-height: none;
      display: -webkit-box;
      -webkit-line-clamp: 10;
      -webkit-box-orient: vertical;
      overflow: hidden;
    `;
  }
  return '';
};

const WhisperStyle = styled.div`
  color: ${({ theme }) => theme.palette.status.info};
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 50vh;
  overflow-y: auto;
  min-width: 0;

  ${thinScrollbar}

  & > p {
    margin: 0;
    overflow-wrap: anywhere;
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  ${getExpandStyles}
`;

export default WhisperStyle;
