/**
 * Theme Name: Milkyway
 * Author: xyzpw
 * Description: The "milkyway" colour scheme from the legacy hack.chat client
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
      hover: '#837dcc',
      logoDark: '#ccbca7',
      main: '#928bff',
    },
    background: {
      alt: '#dac8b1',
      element: '#d2c2ac',
      elementHover: '#cabaa5',
      hover: '#d6c5ae',
      main: '#dfcdb5',
      menu: '#312b2b',
      modal: '#332d2d',
      tertiary: '#ccbca7',
    },
    border: {
      divider: '#7d7a6880',
      focus: '#928bff',
      light: '#9d876f',
      main: '#a78f73',
      subtle: '#7d7a6833',
    },
    scrollbar: {
      menuThumb: '#3d3736',
      thumb: '#ada08f',
      track: '#dfcdb5',
    },
    status: {
      danger: '#d73737',
      dangerBg: '#d737371a',
      emote: '#928bff',
      error: '#ff6c6c',
      errorAlpha: '#ff6c6c99',
      info: '#06b449',
      mentionBg: '#7d7a681a',
      mentionBorder: '#7d7a68',
      spoiler: '#b9ab99c4',
      spoilerReveal: '#0000000d',
      warn: '#ff6c6c',
    },
    text: {
      code: '#615c56',
      inverse: '#dfcdb5',
      muted: '#93897c',
      nick: '#928bff',
      primary: '#615c56',
      secondary: '#615c56',
      trip: '#5b5650',
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
