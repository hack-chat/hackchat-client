/**
 * Theme Name: Atelier Seaside
 * Description: The "atelier-seaside" colour scheme from the legacy hack.chat client
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
      hover: '#a350d1',
      logoDark: '#101210',
      main: '#ad2bee',
    },
    background: {
      alt: '#181b18',
      element: '#1f241f',
      elementHover: '#282e28',
      hover: '#1b1f1b',
      main: '#131513',
      menu: '#242924',
      modal: '#292f29',
      tertiary: '#252b25',
    },
    border: {
      divider: '#687d6880',
      focus: '#ad2bee',
      light: '#6d836d',
      main: '#687d68',
      subtle: '#687d6833',
    },
    scrollbar: {
      menuThumb: '#3e483e',
      thumb: '#434f43',
      track: '#131513',
    },
    status: {
      danger: '#e6193c',
      dangerBg: '#e6193c1a',
      emote: '#ad2bee',
      error: '#c3c322',
      errorAlpha: '#c3c32299',
      info: '#29a329',
      mentionBg: '#687d681a',
      mentionBorder: '#687d68',
      spoiler: '#374137c4',
      spoilerReveal: '#0000001a',
      warn: '#c3c322',
    },
    text: {
      code: '#8ca68c',
      inverse: '#131513',
      muted: '#5c6c5c',
      nick: '#3d62f5',
      primary: '#8ca68c',
      secondary: '#8ca68c',
      trip: '#5e6e5e',
      white: '#cfe8cf',
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
