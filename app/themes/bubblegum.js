/**
 * Theme Name: Bubblegum
 * Author: marzavec
 * Description: The "bubblegum" colour scheme from the legacy hack.chat client
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
      hover: '#a25ccf',
      logoDark: '#70046d',
      main: '#7b59c0',
    },
    background: {
      alt: '#890985',
      element: '#900e8b',
      elementHover: '#981593',
      hover: '#8c0c88',
      main: '#840580',
      menu: '#db04d4',
      modal: '#dd09d6',
      tertiary: '#961391',
    },
    border: {
      divider: '#fcb5fa',
      focus: '#7b59c0',
      light: '#fca9f9',
      main: '#fcb5fa',
      subtle: '#fcb5fa66',
    },
    scrollbar: {
      menuThumb: '#e31cdc',
      thumb: '#b42aae',
      track: '#840580',
    },
    status: {
      danger: '#ca402b',
      dangerBg: '#ca402b1a',
      emote: '#7b59c0',
      error: '#fcf000',
      errorAlpha: '#fcf00099',
      info: '#44fc07',
      mentionBg: '#fcb5fa1a',
      mentionBorder: '#fcb5fa',
      spoiler: '#a821a2c4',
      spoilerReveal: '#0000001a',
      warn: '#fcf000',
    },
    text: {
      code: '#fc62f2',
      inverse: '#840580',
      muted: '#cc3dc4',
      nick: '#516aec',
      primary: '#fc62f2',
      secondary: '#fc62f2',
      trip: '#fc62f2',
      white: '#d8cad8',
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
