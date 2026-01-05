/**
 * Exports a styled div element, this wraps the message portion
 * of a normal chat message event
 */

import styled from 'styled-components';

const ChatStyle = styled.div`
  color: #a6a28c;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'DejaVu Sans Mono', monospace;
  max-height: 50vh;
  overflow-y: auto;
  min-width: 0;

  & {
    --sb-track-color: rgba(0 0 0 / 60%);
    --sb-thumb-color: #909090;
    --sb-size: 8px;
  }

  &::-webkit-scrollbar {
    width: var(--sb-size);
  }

  &::-webkit-scrollbar-track {
    background: var(--sb-track-color);
    border-radius: 4px;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--sb-thumb-color);
    border-radius: 3px;
  }

  @supports not selector(::-webkit-scrollbar) {
    & {
      scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
    }
  }

  & > p {
    margin: 0;
    overflow-wrap: anywhere;
  }

  ${({ $canExpand, $isExpanded }) =>
    $canExpand &&
    !$isExpanded &&
    `
    overflow-y: hidden;
    max-height: none;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
`;

export default ChatStyle;
