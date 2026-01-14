/**
 * A wrapper for the main content of a message. It grows to fill
 * available space and contains the border and alternating background.
 *
 * It also contains styles for rendered markdown content.
 */
import styled from 'styled-components';

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  min-width: 0;

  ${({ $hasBackground }) =>
    $hasBackground &&
    `
    background-color: rgba(0, 0, 0, 0.05);
  `}

  padding-left: 1.5em;

  @media (min-width: 768px) {
    padding-left: 1em;
    border-left: 1px solid rgba(125, 122, 104, 0.5);
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
    color: #60ac39;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  & ul,
  & ol {
    padding-left: 2em;
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
      rgba(125, 122, 104, 0),
      rgba(125, 122, 104, 0.75),
      rgba(125, 122, 104, 0)
    );
    margin: 1.5em 0;
  }

  & code {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 0.2em 0.4em;
    font-size: 0.85em;
    border-radius: 3px;
    color: #ddd;
  }

  & pre {
    background-color: rgba(0, 0, 0, 0.2);
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
    color: #ddd;
    padding: 0;
    text-shadow: 1px 1px 3px #37ff00;
  }

  & blockquote {
    border-left: 3px solid rgba(125, 122, 104, 0.5);
    margin-left: 0;
    padding-left: 1em;
    opacity: 0.85;
  }

  & table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    border: 1px solid rgba(125, 122, 104, 0.2);
    border-radius: 4px;
    overflow: hidden;
    font-size: 0.9em;
  }

  & th,
  & td {
    padding: 0.75em;
    border-bottom: 1px solid rgba(125, 122, 104, 0.2);
  }

  & thead {
    background-color: rgba(0, 0, 0, 0.15);
    color: #ddd;
    font-weight: 600;
  }

  & tbody tr:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.05);
  }

  & tbody tr:last-child td {
    border-bottom: none;
  }

  @media (max-width: 767px) {
    & table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
    }
  }
`;
export default MessageContent;
