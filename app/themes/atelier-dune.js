/**
 * Theme Name: Atelier Dune
 * Description: The "atelier-dune" colour scheme from the legacy hack.chat client
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
      hover: '#b36bbe',
      logoDark: '#1b1b19',
      main: '#b854d4',
    },
    background: {
      alt: '#252521',
      element: '#2d2d28',
      elementHover: '#373630',
      hover: '#292925',
      main: '#20201d',
      menu: '#292824',
      modal: '#2f2e29',
      tertiary: '#34342e',
    },
    border: {
      divider: '#7d7a6880',
      focus: '#b854d4',
      light: '#83806d',
      main: '#7d7a68',
      subtle: '#7d7a6833',
    },
    scrollbar: {
      menuThumb: '#48473e',
      thumb: '#565449',
      track: '#20201d',
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
      spoiler: '#48473ec4',
      spoilerReveal: '#0000001a',
      warn: '#cfb017',
    },
    text: {
      code: '#a6a28c',
      inverse: '#20201d',
      muted: '#706e60',
      nick: '#6684e1',
      primary: '#a6a28c',
      secondary: '#a6a28c',
      trip: '#6e6b5e',
      white: '#e8e4cf',
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
