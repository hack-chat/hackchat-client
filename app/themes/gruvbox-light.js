/**
 * Theme Name: Gruvbox Light
 * Author: marzavec
 * Description: The "gruvbox-light" colour scheme from the legacy hack.chat client
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
      hover: '#67621a',
      logoDark: '#ded5b1',
      main: '#79740e',
    },
    background: {
      alt: '#f3eac1',
      element: '#e8dfb9',
      elementHover: '#dbd2ae',
      hover: '#eee4bd',
      main: '#fbf1c7',
      menu: '#a89984',
      modal: '#a39480',
      tertiary: '#ded5b1',
    },
    border: {
      divider: '#7d7a6880',
      focus: '#79740e',
      light: '#737061',
      main: '#7d7a68',
      subtle: '#7d7a6833',
    },
    scrollbar: {
      menuThumb: '#8d8171',
      thumb: '#afa78d',
      track: '#fbf1c7',
    },
    status: {
      danger: '#9d0006',
      dangerBg: '#9d00061a',
      emote: '#79740e',
      error: '#b57614',
      errorAlpha: '#b5761499',
      info: '#b57614',
      mentionBg: '#7d7a681a',
      mentionBorder: '#7d7a68',
      spoiler: '#c2ba9cc4',
      spoilerReveal: '#0000000d',
      warn: '#b57614',
    },
    text: {
      code: '#3c3836',
      inverse: '#fbf1c7',
      muted: '#888270',
      nick: '#427b58',
      primary: '#3c3836',
      secondary: '#3c3836',
      trip: '#7c6f64',
      white: '#3c3836',
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
