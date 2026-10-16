/**
 * Exports a styled div
 */

import styled from 'styled-components';

const getBackground = (props) => {
  if (props.$isMentioned) return props.theme.palette.status.mentionBg;
  if (props.$hasBackground) return props.theme.palette.background.alt;
  return 'transparent';
};

const getBorderColor = (props) => {
  if (props.$isMentioned) return props.theme.palette.status.mentionBorder;
  return props.theme.palette.border.divider;
};

export default styled.div`
  height: ${({ theme }) => theme.padding.chat.lastChild};
  background-color: ${getBackground} !important;
  box-sizing: border-box;
  padding-inline: 1.5em 0.5em;

  @media (width >= 768px) {
    margin-inline-start: calc(220px + 1em);
    padding-inline-start: 1em;
    border-inline-start: 1px solid ${getBorderColor} !important;
  }

  @media (width <= 767px) {
    max-width: 100%;
    border-inline-start: none;
    padding-inline: 0.75em 0.5em;
  }
`;
