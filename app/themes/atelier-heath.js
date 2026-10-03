/**
 * Theme Name: Atelier Heath
 * Description: The "atelier-heath" colour scheme from the legacy hack.chat client
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
      hover: '#896dba',
      logoDark: '#171417',
      main: '#7b59c0',
    },
    background: {
      alt: '#211d21',
      element: '#292529',
      elementHover: '#332e33',
      hover: '#252125',
      main: '#1b181b',
      menu: '#292329',
      modal: '#302930',
      tertiary: '#312c31',
    },
    border: {
      divider: '#77697780',
      focus: '#7b59c0',
      light: '#7f717f',
      main: '#776977',
      subtle: '#77697733',
    },
    scrollbar: {
      menuThumb: '#4a414a',
      thumb: '#554c55',
      track: '#1b181b',
    },
    status: {
      danger: '#ca402b',
      dangerBg: '#ca402b1a',
      emote: '#7b59c0',
      error: '#bb8a35',
      errorAlpha: '#bb8a3599',
      info: '#379a37',
      mentionBg: '#7769771a',
      mentionBorder: '#776977',
      spoiler: '#463f46c4',
      spoilerReveal: '#0000001a',
      warn: '#bb8a35',
    },
    text: {
      code: '#ab9bab',
      inverse: '#1b181b',
      muted: '#716771',
      nick: '#516aec',
      primary: '#ab9bab',
      secondary: '#ab9bab',
      trip: '#695d69',
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
