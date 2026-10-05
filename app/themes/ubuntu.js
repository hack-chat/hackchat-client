/**
 * Theme Name: Ubuntu
 * Author: Potatochips2001
 * Description: The "ubuntu" colour scheme from the legacy hack.chat client
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
      hover: '#c7549e',
      logoDark: '#25001a',
      main: '#b854d4',
    },
    background: {
      alt: '#34031e',
      element: '#3f081e',
      elementHover: '#4c0e1e',
      hover: '#39061e',
      main: '#2c001e',
      menu: '#2c001e',
      modal: '#35041e',
      tertiary: '#480d1e',
    },
    border: {
      divider: '#2c001e',
      focus: '#b854d4',
      light: '#732e49',
      main: '#5e2750',
      subtle: '#2c001e66',
    },
    scrollbar: {
      menuThumb: '#5b151f',
      thumb: '#78221f',
      track: '#2c001e',
    },
    status: {
      danger: '#ac4142',
      dangerBg: '#ac41421a',
      emote: '#b854d4',
      error: '#cfb017',
      errorAlpha: '#cfb01799',
      info: '#00aa22',
      mentionBg: '#2c001e1a',
      mentionBorder: '#2c001e',
      spoiler: '#65191fc4',
      spoilerReveal: '#0000001a',
      warn: '#cfb017',
    },
    text: {
      code: '#e95420',
      inverse: '#2c001e',
      muted: '#9d321f',
      nick: '#e95420',
      primary: '#e95420',
      secondary: '#e95420',
      trip: '#aea79f',
      white: '#00aa00',
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
