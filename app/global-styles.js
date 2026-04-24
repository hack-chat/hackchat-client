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
    --sb-track-color: #20201d;
    --sb-thumb-color: #909090;
    --sb-size: 10px;

    background: #20201d;
    color: #a6a28c;
  }

  body::-webkit-scrollbar {
    width: var(--sb-size);
  }

  body::-webkit-scrollbar-track {
    background: var(--sb-track-color);
    border-radius: 3px;
  }

  body::-webkit-scrollbar-thumb {
    background: var(--sb-thumb-color);
    border-radius: 3px;
  }

  @supports not selector(::-webkit-scrollbar) {
    body {
      scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
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
    color: #a6a28c;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
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

  ul,
  ol {
    display: block;
    margin: 0;
    padding: 0;
    list-style-type: disc;
    margin-block: 1em;
    margin-inline: 0;
    padding-inline-start: 40px;
  }

  ul ul,
  ol ol {
    padding-left: 2em;
  }

  ul li {
    list-style: inside;
  }

  table {
    color: #ddd;
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

  td,
  th {
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
    border-top: 1px solid #4e4e4e;
  }

  table > thead > tr > th {
    vertical-align: bottom;
    border-bottom: 2px solid #4e4e4e;
  }

  table > tbody > tr:nth-child(odd) > td,
  table > tbody > tr:nth-child(odd) > th {
    background-color: #4e4e4e;
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
    background-color: #4e4e4e;
    border: 1px solid #000;
    border-radius: 4px;
    color: #797979;
    margin: 0 auto;
  }

  code {
    padding: 2px 4px;
    font-size: 90%;
    color: #000;
    background-color: #4e4e4e;
    border-radius: 4px;
  }

  blockquote {
    padding: 3px 10px;
    margin: 3px;
    border-left: 5px solid #4e4e4e;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #4e4e4e;
  }

  mark {
    background-color: #60ac39;
    color: black;
  }

  label {
    vertical-align: 3px;
  }

  .hidden {
    display: none;
  }

  .expand {
    height: 100%;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
  }

  .message {
    padding-bottom: 1em;
    border-left: 1px solid rgb(125 122 104 / 50%);
  }

  .refmessage {
    padding-bottom: 1em;
    border-left: 1px solid rgb(125 122 104 / 100%);
  }

  .text {
    margin: 0;
    margin-left: 1em;
  }

  .text p {
    margin: 0;
  }

  .text a {
    color: #e8e4cf;
  }

  .message .text {
    word-wrap: break-word;
  }

  .nick {
    float: left;
    width: 16em;
    margin-left: -17em;
    margin-right: 1em;
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    color: #6684e1;
  }

  .trip {
    font-size: 10px;
    color: #6e6b5e;
  }

  .admin .nick {
    color: #d73737;
  }

  .mod .nick {
    color: #1fad83;
  }

  .me .nick {
    color: #b854d4;
  }

  .info .nick,
  .info .text {
    color: #60ac39;
  }

  .warn .nick,
  .warn .text {
    color: #cfb017;
  }

  .jebbed {
    background: linear-gradient(to right, #66f, #09f, #0f0, #f39, #66f);
    background-clip: text;
    color: transparent;
    animation: rainbow-animation 6s ease-in-out infinite;
    background-size: 400% 100%;
  }

  #app {
    height: 100dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  #messages {
    padding-top: 2em;
  }

  #footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #20201d;
  }

  #chatform {
    border-top: 1px solid;
    border-color: #7d7a68;
  }

  #chatinput {
    width: 100%;
    padding: 1em;
    box-sizing: border-box;
  }

  #sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 1em;
    border-left: solid 1px;
    overflow-y: auto;
    background: #292824;
    border-color: #7d7a68;
  }

  #sidebar-content {
    width: 180px;
    padding-bottom: 10%;
  }

  #sidebar-content ul {
    padding-inline-start: 20px;
  }

  #sidebar-content ul li {
    list-style: disc outside none;
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

  @media only screen and (width <= 600px) {
    #messages {
      border: none;
      padding: 0.5em;
    }

    .message {
      padding-bottom: 0.5em;
    }

    .nick {
      margin: 0;
      float: none;
      text-align: left;
      display: inline;
    }

    .text {
      display: inline;
    }

    #sidebar {
      top: 0.5em;
      bottom: auto;
      right: 0.5em;
      border: none;
    }
  }
`;

export default GlobalStyle;
