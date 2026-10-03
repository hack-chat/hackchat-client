/**
 * Theme Name: Bright
 * Description: The "bright" colour scheme from the legacy hack.chat client
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
      hover: '#d79ecc',
      logoDark: '#000000',
      main: '#d381c3',
    },
    background: {
      alt: '#090909',
      element: '#161616',
      elementHover: '#262626',
      hover: '#101010',
      main: '#000000',
      menu: '#303030',
      modal: '#393939',
      tertiary: '#222222',
    },
    border: {
      divider: '#b0b0b080',
      focus: '#d381c3',
      light: '#b7b7b7',
      main: '#b0b0b0',
      subtle: '#b0b0b033',
    },
    scrollbar: {
      menuThumb: '#5c5c5c',
      thumb: '#5a5a5a',
      track: '#000000',
    },
    status: {
      danger: '#fb0120',
      dangerBg: '#fb01201a',
      emote: '#d381c3',
      error: '#fda331',
      errorAlpha: '#fda33199',
      info: '#a1c659',
      mentionBg: '#b0b0b01a',
      mentionBorder: '#b0b0b0',
      spoiler: '#434343c4',
      spoilerReveal: '#0000001a',
      warn: '#fda331',
    },
    text: {
      code: '#e0e0e0',
      inverse: '#000000',
      muted: '#868686',
      nick: '#6fb3d2',
      primary: '#e0e0e0',
      secondary: '#e0e0e0',
      trip: '#505050',
      white: '#f5f5f5',
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
