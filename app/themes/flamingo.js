/**
 * Theme Name: Flamingo
 * Author: xyzpw
 * Description: The "flamingo" colour scheme from the legacy hack.chat client
 */

const theme = {
  customCss: `
    .chat-input {
      background-color: #fc8eac !important;
      border-top-color: #000000 !important;
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
      hover: '#222d6e',
      logoDark: '#c58a8c',
      main: '#2b3493',
    },
    background: {
      alt: '#dc989b',
      element: '#cf9093',
      elementHover: '#c0878a',
      hover: '#d69497',
      main: '#e59da1',
      menu: '#93363e',
      modal: '#8c353c',
      tertiary: '#c58a8c',
    },
    border: {
      divider: '#74736980',
      focus: '#2b3493',
      light: '#7f3238',
      main: '#93363e',
      subtle: '#74736933',
    },
    scrollbar: {
      menuThumb: '#723034',
      thumb: '#8f696a',
      track: '#e59da1',
    },
    status: {
      danger: '#d40000',
      dangerBg: '#d400001a',
      emote: '#2b3493',
      error: '#be2300',
      errorAlpha: '#be230099',
      info: '#017201',
      mentionBg: '#7473691a',
      mentionBorder: '#747369',
      spoiler: '#a47678c4',
      spoilerReveal: '#0000000d',
      warn: '#be2300',
    },
    text: {
      code: '#0d1c17',
      inverse: '#e59da1',
      muted: '#63504e',
      nick: '#2b3493',
      primary: '#0d1c17',
      secondary: '#0d1c17',
      trip: '#515151',
      white: '#0d0fa4',
    },
  },
  typography: {
    fontSize: '0.75em',
    import: '',
    letterSpacing: '0px',
    primary: '"DejaVu Sans Mono", monospace',
  },
};

export default theme;
