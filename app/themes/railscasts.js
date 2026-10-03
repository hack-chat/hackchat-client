/**
 * Theme Name: Railscasts
 * Description: The "railscasts" colour scheme from the legacy hack.chat client
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
      hover: '#c4c1e7',
      logoDark: '#252525',
      main: '#b6b3eb',
    },
    background: {
      alt: '#323232',
      element: '#3e3d3d',
      elementHover: '#4b4a49',
      hover: '#383837',
      main: '#2b2b2b',
      menu: '#272935',
      modal: '#31323d',
      tertiary: '#474646',
    },
    border: {
      divider: '#5a647e80',
      focus: '#b6b3eb',
      light: '#6f778c',
      main: '#5a647e',
      subtle: '#5a647e33',
    },
    scrollbar: {
      menuThumb: '#57575f',
      thumb: '#767472',
      track: '#2b2b2b',
    },
    status: {
      danger: '#da4939',
      dangerBg: '#da49391a',
      emote: '#b6b3eb',
      error: '#ffc66d',
      errorAlpha: '#ffc66d99',
      info: '#a5c261',
      mentionBg: '#5a647e1a',
      mentionBorder: '#5a647e',
      spoiler: '#636260c4',
      spoilerReveal: '#0000001a',
      warn: '#ffc66d',
    },
    text: {
      code: '#e6e1dc',
      inverse: '#2b2b2b',
      muted: '#9b9895',
      nick: '#6d9cbe',
      primary: '#e6e1dc',
      secondary: '#e6e1dc',
      trip: '#3a4055',
      white: '#f4f1ed',
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
