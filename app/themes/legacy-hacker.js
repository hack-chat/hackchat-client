/**
 * Theme Name: Legacy Hacker
 * Description: The "hacker" colour scheme from the legacy hack.chat client
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
      logoDark: '#151515',
      main: '#00bb00',
    },
    background: {
      alt: '#181f18',
      element: '#172917',
      elementHover: '#153515',
      hover: '#172417',
      main: '#191919',
      menu: '#333333',
      modal: '#303a30',
      tertiary: '#153115',
    },
    border: {
      divider: '#00770080',
      focus: '#00bb00',
      light: '#008100',
      main: '#007700',
      subtle: '#00770033',
    },
    scrollbar: {
      menuThumb: '#265526',
      thumb: '#0f5a0f',
      track: '#191919',
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
      spoiler: '#124a12c4',
      spoilerReveal: '#0000001a',
      warn: '#007700',
    },
    text: {
      code: '#00bb00',
      inverse: '#191919',
      muted: '#0a7a0a',
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
