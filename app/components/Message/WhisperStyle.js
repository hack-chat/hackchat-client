/**
 * Exports a styled div
 */

import styled, { css } from 'styled-components';

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
  font-family: 'DejaVu Sans Mono', monospace;
  max-height: 50vh;
  overflow-y: auto;
  min-width: 0;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.palette.scrollbar.thumb}
    ${({ theme }) => theme.palette.scrollbar.track};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.palette.scrollbar.track};
    border-radius: 4px;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.scrollbar.thumb};
    border-radius: 3px;
  }

  & > p {
    margin: 0;
    overflow-wrap: anywhere;
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  ${getExpandStyles}
`;

export default WhisperStyle;
