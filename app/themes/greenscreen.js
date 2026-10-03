/**
 * Theme Name: Greenscreen
 * Description: The "greenscreen" colour scheme from the legacy hack.chat client
 */

const theme = {
  customCss: '',
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
      hover: '#00bb00',
      logoDark: '#000e00',
      main: '#00bb00',
    },
    background: {
      alt: '#001800',
      element: '#002200',
      elementHover: '#002e00',
      hover: '#001d00',
      main: '#001100',
      menu: '#003300',
      modal: '#003a00',
      tertiary: '#002b00',
    },
    border: {
      divider: '#00770080',
      focus: '#00bb00',
      light: '#008100',
      main: '#007700',
      subtle: '#00770033',
    },
    scrollbar: {
      menuThumb: '#005500',
      thumb: '#005500',
      track: '#001100',
    },
    status: {
      danger: '#007700',
      dangerBg: '#0077001a',
      emote: '#00bb00',
      error: '#007700',
      errorAlpha: '#00770099',
      info: '#00bb00',
      mentionBg: '#0077001a',
      mentionBorder: '#007700',
      spoiler: '#004400c4',
      spoilerReveal: '#0000001a',
      warn: '#007700',
    },
    text: {
      code: '#00bb00',
      inverse: '#001100',
      muted: '#007700',
      nick: '#009900',
      primary: '#00bb00',
      secondary: '#00bb00',
      trip: '#005500',
      white: '#00dd00',
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
