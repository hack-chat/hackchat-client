/**
 * Theme Name: Atelier Lakeside
 * Description: The "atelier-lakeside" colour scheme from the legacy hack.chat client
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
      hover: '#6772b2',
      logoDark: '#131719',
      main: '#5d5db1',
    },
    background: {
      alt: '#1a2023',
      element: '#20292c',
      elementHover: '#283237',
      hover: '#1d2428',
      main: '#161b1d',
      menu: '#1f292e',
      modal: '#242f35',
      tertiary: '#262f34',
    },
    border: {
      divider: '#5a7b8c80',
      focus: '#5d5db1',
      light: '#5f8192',
      main: '#5a7b8c',
      subtle: '#5a7b8c33',
    },
    scrollbar: {
      menuThumb: '#374750',
      thumb: '#405159',
      track: '#161b1d',
    },
    status: {
      danger: '#d22d72',
      dangerBg: '#d22d721a',
      emote: '#5d5db1',
      error: '#8a8a0f',
      errorAlpha: '#8a8a0f99',
      info: '#568c3b',
      mentionBg: '#5a7b8c1a',
      mentionBorder: '#5a7b8c',
      spoiler: '#35444ac4',
      spoilerReveal: '#0000001a',
      warn: '#8a8a0f',
    },
    text: {
      code: '#7ea2b4',
      inverse: '#161b1d',
      muted: '#546c78',
      nick: '#257fad',
      primary: '#7ea2b4',
      secondary: '#7ea2b4',
      trip: '#516d7b',
      white: '#c1e4f6',
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
