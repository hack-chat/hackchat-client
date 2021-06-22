/**
 * Root style sheet for the ui
 */

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    background-color: #2a2949;
    --scrollbarBG: #2a2a49;
    --thumbBG: #9740dd;
  }

  body {
    font-family: 'DejaVu Sans Mono', monospace, sans-serif;
    scrollbar-width: thin;
    scrollbar-color: var(--thumbBG) var(--scrollbarBG);
  }

  body::-webkit-scrollbar {
    width: 11px;
  }

  body::-webkit-scrollbar-track {
    background: var(--scrollbarBG);
  }

  body::-webkit-scrollbar-thumb {
    background-color: var(--thumbBG) ;
    border-radius: 6px;
    border: 3px solid var(--scrollbarBG);
  }

  #app {
    background-color: #2a2a49;
    color: #f5f5f7;
    height: 100%;
    width: 100%;
    font-size: 11px;
  }

  .modal-content {
    background-color: rgba(0, 0, 0, 0) !important;
    border: none !important;
  }

  .form-control:focus {
    outline: 0;
    box-shadow: none !important;
  }

  textarea, input[type="text"], input[type="password"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"], .uneditable-input {
    color: #f5f5f7 !important;
    background-color: #343a40 !important;
  }

  textarea:focus, input[type="text"]:focus, input[type="password"]:focus, input[type="datetime"]:focus, input[type="datetime-local"]:focus, input[type="date"]:focus, input[type="month"]:focus, input[type="time"]:focus, input[type="week"]:focus, input[type="number"]:focus, input[type="email"]:focus, input[type="url"]:focus, input[type="search"]:focus, input[type="tel"]:focus, input[type="color"]:focus, .uneditable-input:focus {
    background: linear-gradient(to right, #3e444c, #343a40) !important;
  }

  .dropdown-divider {
    border-image: linear-gradient(to right,#3b7ed0,#9740dd) !important;
    border-image-slice: 1 !important;
  }

  p {
    margin-bottom: 0;
  }

  pre {
    display: block;
    padding: 4.5px;
    padding-left: 8.5px;
    margin-bottom: 0 !important;
    font-size: 13px;
    line-height: 1.42857143;
    color: #adb5bd;
    word-break: break-all;
    word-wrap: break-word;
    background-color: #1c1c31;
    border: 1px solid #131320;
    border-radius: 4px;
  }

  code {
    padding: 2px 4px;
    font-size: 90%;
    color: #adb5bd;
    background-color: #1c1c31;
    border-radius: 4px;
  }

  hr {
    background: linear-gradient(to right,#3b7ed0 0%,#9740dd 100%);
    height: 1px;
  }

  mark {
    background-color: #3b7ed0;
    background-image: linear-gradient(to right,#3b7ed0 0%,#9740dd 100%);
    background-size: 100%;
    -webkit-background-clip: text; /* stylelint-disable-line */
    -moz-background-clip: text; /* stylelint-disable-line */
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }

  blockquote {
    padding: 5px 10px;
    border-left: 4px solid #1c1c31;
  }

  a {
    color: #FFF;
  }

  h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
    margin-bottom: 0;
  }

  .close {
    background-color: transparent;
    border: 0;
    font-size: 1.5rem;
    text-shadow: 0 1px 0 #fff;
    opacity: .6;
    color: #000;
    font-weight: 700;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
  }
`;

export default GlobalStyle;
