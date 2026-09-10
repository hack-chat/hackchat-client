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

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  min-width: 0;
  padding-inline-start: 1.5em;
  background-color: ${getBackground} !important;

  @media (width >= 768px) {
    padding-inline-start: 1em;
    border-inline-start: 1px solid ${getBorderColor} !important;
  }

  & p,
  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6,
  & li,
  & blockquote {
    color: inherit;
  }

  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    margin-top: 0;
    margin-bottom: 0.5em;
    font-weight: 600;
  }

  & h1 {
    font-size: 1.7em;
  }

  & h2 {
    font-size: 1.4em;
  }

  & h3 {
    font-size: 1.2em;
  }

  & a {
    color: ${({ theme }) => theme.palette.text.white};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  & ul,
  & ol {
    padding-inline-start: 2em;
    margin-bottom: 1em;
  }

  & li {
    margin-bottom: 0.4em;
  }

  & img {
    max-width: 100%;
    height: auto;
    max-height: 350px;
    border-radius: 4px;
    margin: 0.5em 0;
  }

  & hr {
    border: 0;
    height: 1px;
    background-image: linear-gradient(
      to right,
      transparent,
      ${({ theme }) => theme.palette.border.divider},
      transparent
    );
    margin: 1.5em 0;
  }

  & code {
    background-color: ${({ theme }) => theme.palette.background.tertiary};
    padding: 0.2em 0.4em;
    font-size: 0.85em;
    border-radius: 3px;
    color: ${({ theme }) => theme.palette.text.primary};
  }

  & pre {
    background-color: ${({ theme }) => theme.palette.background.tertiary};
    border-radius: 4px;
    padding: 1em;
    overflow-x: auto;
    font-size: 0.9em;
  }

  & pre code {
    background-color: transparent;
    padding: 0;
  }

  & mark {
    background-color: transparent;
    color: ${({ theme }) => theme.palette.text.primary};
    padding: 0;
    text-shadow: 1px 1px 3px #37ff00;
  }

  & blockquote {
    border-inline-start: 3px solid
      ${({ theme }) => theme.palette.border.divider};
    margin-inline-start: 0;
    padding-inline-start: 1em;
    opacity: 0.85;
  }

  & table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    border: 1px solid ${({ theme }) => theme.palette.border.subtle};
    border-radius: 4px;
    overflow: hidden;
    font-size: 0.9em;
  }

  & th,
  & td {
    padding: 0.75em;
    border-bottom: 1px solid ${({ theme }) => theme.palette.border.subtle};
  }

  & thead {
    background-color: ${({ theme }) => theme.palette.background.tertiary};
    color: ${({ theme }) => theme.palette.text.primary};
    font-weight: 600;
  }

  & tbody tr:nth-child(even) {
    background-color: ${({ theme }) => theme.palette.background.alt};
  }

  & tbody tr:last-child td {
    border-bottom: none;
  }

  @media (width <= 767px) {
    & table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
    }
  }
`;
export default MessageContent;
