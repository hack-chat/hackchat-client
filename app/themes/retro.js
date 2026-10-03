/**
 * Theme Name: Retro
 * Author: Roslot
 * Description: The "retro" colour scheme from the legacy hack.chat client
 */

const theme = {
  customCss: `
    :root {
      color-scheme: dark;
      scrollbar-color: #8e8e8e #151515;
    }

    pre {
      background: #1d1f21 !important;
    }

    /* the chat log as a window with a title bar */
    .chat-log {
      margin: 1.5em 1.5em 0;
      border: 2px solid gray;
      border-bottom: 0;
    }

    .chat-log::before {
      content: 'hack.chat';
      position: sticky;
      top: 0;
      z-index: 2;
      flex-shrink: 0;
      padding: 2px 3px;
      border-bottom: 2px solid gray;
      background: linear-gradient(to right, #000080, #1084d0);
      color: #dddddd;
      font-size: 12px;
    }

    /* new messages are highlighted for a few seconds */
    @keyframes retro-new-message {
      0%, 100% { background-color: initial; }
      0.1%, 99.9% { background-color: #062336; }
    }

    .message {
      animation: retro-new-message 10s steps(1, start) 1;
    }

    .message > div {
      border-inline-start: 0 !important;
    }

    .message:has(.welcome) {
      background: #7e414b !important;
    }

    .message:has(.info) {
      background: #2a7550 !important;
    }

    .message:has(.warn) {
      background: #887221 !important;
    }

    .message:has(.info) *,
    .message:has(.warn) * {
      color: #000000 !important;
    }

    /* timestamp | trip nick | message */
    @media (width >= 768px) {
      .nick-column {
        width: 340px !important;
      }

      .nick-column::before {
        content: attr(title);
        float: left;
        padding: 0.25em 0 0 0.5em;
      }
    }

    .nick {
      font-weight: bold;
    }

    .nick-column .nick::after {
      content: ' |' !important;
      font-weight: bolder;
    }

    .trip {
      font-weight: normal;
    }

    /* the input as the bottom pane of the window */
    .chat-form {
      box-sizing: border-box;
      width: auto !important;
      margin: 0 1.5em;
      border: 2px solid gray;
    }

    .chat-form::before {
      display: none !important;
    }

    .chat-input {
      max-width: none !important;
      border: 0 !important;
    }
  `,
  padding: {
    chat: {
      firstChild: '0.5em',
      lastChild: '0.5em',
      msgSpacing: '0.3em',
    },
    mainMenu: {
      buttons: '0.4rem 0.2rem',
    },
  },
  palette: {
    accent: {
      hover: '#ab65bf',
      logoDark: '#040404',
      main: '#b854d4',
    },
    background: {
      alt: '#00000000',
      element: '#131313',
      elementHover: '#1c1c1c',
      hover: '#0f0f0f',
      main: '#050505',
      menu: '#050505',
      modal: '#0c0c0c',
      tertiary: '#1a1a1a',
    },
    border: {
      divider: '#7d7a6880',
      focus: '#b854d4',
      light: '#807d6e',
      main: '#7d7a68',
      subtle: '#7d7a6833',
    },
    scrollbar: {
      menuThumb: '#272727',
      thumb: '#3c3c3c',
      track: '#050505',
    },
    status: {
      danger: '#d73737',
      dangerBg: '#d737371a',
      emote: '#b854d4',
      error: '#cfb017',
      errorAlpha: '#cfb01799',
      info: '#60ac39',
      mentionBg: '#7d7a681a',
      mentionBorder: '#7d7a68',
      spoiler: '#2e2e2ec4',
      spoilerReveal: '#0000001a',
      warn: '#cfb017',
    },
    text: {
      code: '#8e8e8e',
      inverse: '#050505',
      muted: '#575757',
      nick: '#6684e1',
      primary: '#8e8e8e',
      secondary: '#8e8e8e',
      trip: '#6e6b5e',
      white: '#e8e4cf',
    },
  },
  typography: {
    fontSize: '0.75em',
    import: '',
    letterSpacing: '0px',
    primary:
      "'Courier New', 'Consolas', 'Lucida Console', 'Menlo', Courier, monospace",
  },
};

export default theme;
