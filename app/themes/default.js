/**
 * Theme Name: Default
 * Author: Marzavec
 * Github: https://github.com/marzavec
 * Description: The classic hack.chat theme
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
      hover: '#b7b39d',
      logoDark: '#292820',
      main: '#a6a28c',
    },
    background: {
      alt: '#272727',
      element: '#333333',
      elementHover: '#444444',
      hover: '#151513',
      main: '#20201d',
      menu: '#1e1e1e',
      modal: '#2a2a2a',
      tertiary: '#4e4e4e',
    },
    border: {
      divider: '#7d7a6880',
      focus: '#a6a28c',
      light: '#555555',
      main: '#444444',
      subtle: '#7d7a6833',
    },
    scrollbar: {
      menuThumb: '#4f4d42',
      thumb: '#909090',
      track: '#20201d',
    },
    status: {
      danger: '#ff6b6b',
      dangerBg: '#ff6b6b1a',
      emote: '#7e00b0',
      error: '#f04747',
      errorAlpha: '#f0474799',
      info: '#60ac39',
      mentionBg: '#e67e221a',
      mentionBorder: '#e67e22',
      spoiler: '#4f4d42c4',
      spoilerReveal: '#0000001a',
      warn: '#cfb017',
    },
    text: {
      code: '#a8b2c1',
      inverse: '#1e1e1e',
      muted: '#8a8a8a',
      primary: '#dddddd',
      secondary: '#a6a28c',
      trip: '#6e6b5e',
      white: '#ffffff',
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
