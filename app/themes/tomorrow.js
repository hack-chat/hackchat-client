/**
 * Theme Name: Tomorrow
 * Author: marzavec
 * Description: The "tomorrow" colour scheme from the legacy hack.chat client
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
      hover: '#b8a4be',
      logoDark: '#191a1c',
      main: '#b294bb',
    },
    background: {
      alt: '#242628',
      element: '#2e3032',
      elementHover: '#3a3c3d',
      hover: '#292b2d',
      main: '#1d1f21',
      menu: '#282a2e',
      modal: '#303236',
      tertiary: '#36383a',
    },
    border: {
      divider: '#96989680',
      focus: '#b294bb',
      light: '#9d9f9d',
      main: '#969896',
      subtle: '#96989633',
    },
    scrollbar: {
      menuThumb: '#4f5254',
      thumb: '#606363',
      track: '#1d1f21',
    },
    status: {
      danger: '#cc6666',
      dangerBg: '#cc66661a',
      emote: '#b294bb',
      error: '#f0c674',
      errorAlpha: '#f0c67499',
      info: '#b5bd68',
      mentionBg: '#9698961a',
      mentionBorder: '#969896',
      spoiler: '#4f5253c4',
      spoilerReveal: '#0000001a',
      warn: '#f0c674',
    },
    text: {
      code: '#c5c8c6',
      inverse: '#1d1f21',
      muted: '#828484',
      nick: '#81a2be',
      primary: '#c5c8c6',
      secondary: '#c5c8c6',
      trip: '#373b41',
      white: '#e0e0e0',
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
