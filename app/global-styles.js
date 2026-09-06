/**
 * Root style sheet for the ui
 */

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100dvh;
    margin: 0;
    overflow: hidden;
  }

  body {
    background: ${({ theme }) => theme.palette.background.main};
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  body::-webkit-scrollbar {
    width: 10px;
  }

  body::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.palette.scrollbar.track};
    border-radius: 3px;
  }

  body::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.scrollbar.thumb};
    border-radius: 3px;
  }

  @supports not selector(::-webkit-scrollbar) {
    body {
      scrollbar-color: ${({ theme }) => theme.palette.scrollbar.thumb} ${({ theme }) => theme.palette.scrollbar.track};
    }
  }

  body,
  input,
  textarea {
    font-family: 'DejaVu Sans Mono', monospace;
    font-size: 12px;
    tab-size: 4;
  }

  input,
  textarea {
    background: none;
    border: none;
    outline: none;
    resize: none;
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 3px;
    margin-top: 0;
  }

  h4 {
    font-size: 12px;
    margin: 1em 0;
    font-weight: bold;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    text-decoration: underline;
  }

  ul, ol {
    display: block;
    margin: 0;
    padding: 0;
    list-style-type: disc;
    margin-block: 1em;
    margin-inline: 0;
    padding-inline-start: 40px;
  }

  ul ul, ol ol {
    padding-inline-start: 2em;
  }

  ul li {
    list-style: inside;
  }

  table {
    color: ${({ theme }) => theme.palette.text.primary};
    background-color: transparent;
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    border-spacing: 0;
    border-collapse: collapse;
  }

  th {
    text-align: left;
  }

  td, th {
    padding: 0;
  }

  table > thead > tr > th,
  table > tbody > tr > th,
  table > tfoot > tr > th,
  table > thead > tr > td,
  table > tbody > tr > td,
  table > tfoot > tr > td {
    padding: 8px;
    line-height: 1.4286;
    vertical-align: top;
    border-top: 1px solid ${({ theme }) => theme.palette.background.tertiary};
  }

  table > thead > tr > th {
    vertical-align: bottom;
    border-bottom: 2px solid ${({ theme }) => theme.palette.background.tertiary};
  }

  table > tbody > tr:nth-child(odd) > td,
  table > tbody > tr:nth-child(odd) > th {
    background-color: ${({ theme }) => theme.palette.background.tertiary};
  }

  table > caption + thead > tr:first-child > th,
  table > colgroup + thead > tr:first-child > th,
  table > thead:first-child > tr:first-child > th,
  table > caption + thead > tr:first-child > td,
  table > colgroup + thead > tr:first-child > td,
  table > thead:first-child > tr:first-child > td {
    border-top: 0;
  }

  img {
    max-width: 50%;
    max-height: 800px;
  }

  pre {
    display: block;
    line-height: 1.4286;
    tab-size: 4;
    white-space: pre-wrap;
    word-break: break-all;
    word-wrap: break-word;
    background-color: ${({ theme }) => theme.palette.background.tertiary};
    border: 1px solid #000;
    border-radius: 4px;
    color: #797979;
    margin: 0 auto;
  }

  code {
    padding: 2px 4px;
    font-size: 90%;
    color: #000;
    background-color: ${({ theme }) => theme.palette.background.tertiary};
    border-radius: 4px;
  }

  blockquote {
    padding: 3px 10px;
    margin: 3px;
    border-inline-start: 5px solid ${({ theme }) => theme.palette.background.tertiary};
  }

  blockquote > p {
    margin: 0;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid ${({ theme }) => theme.palette.background.tertiary};
  }

  mark {
    background-color: ${({ theme }) => theme.palette.status.info};
    color: black;
  }

  label {
    vertical-align: 3px;
  }

  @keyframes rainbow-animation {
    0%,
    100% {
      background-position: 0 0;
    }

    50% {
      background-position: 100% 0;
    }
  }
`;

export default GlobalStyle;
