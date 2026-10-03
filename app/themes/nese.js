/**
 * Theme Name: Nese
 * Author: marzavec
 * Description: The "nese" colour scheme from the legacy hack.chat client
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
      hover: '#aa8eb2',
      logoDark: '#030303',
      main: '#9c73a7',
    },
    background: {
      alt: '#0b0b0b',
      element: '#171717',
      elementHover: '#252525',
      hover: '#111111',
      main: '#030303',
      menu: '#0d0d0d',
      modal: '#171717',
      tertiary: '#212121',
    },
    border: {
      divider: '#73737380',
      focus: '#9c73a7',
      light: '#808080',
      main: '#737373',
      subtle: '#73737333',
    },
    scrollbar: {
      menuThumb: '#3d3d3d',
      thumb: '#535353',
      track: '#030303',
    },
    status: {
      danger: '#f73e30',
      dangerBg: '#f73e301a',
      emote: '#9c73a7',
      error: '#faba3d',
      errorAlpha: '#faba3d99',
      info: '#1ab857',
      mentionBg: '#7373731a',
      mentionBorder: '#737373',
      spoiler: '#3f3f3fc4',
      spoilerReveal: '#0000001a',
      warn: '#faba3d',
    },
    text: {
      code: '#cccccc',
      inverse: '#030303',
      muted: '#7c7c7c',
      nick: '#388bb8',
      primary: '#cccccc',
      secondary: '#cccccc',
      trip: '#333333',
      white: '#f2f2f2',
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
