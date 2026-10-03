/**
 * Theme Name: Android
 * Description: The "android" colour scheme from the legacy hack.chat client
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
      hover: '#ac8cba',
      logoDark: '#1c1c1c',
      main: '#9568aa',
    },
    background: {
      alt: '#292929',
      element: '#343434',
      elementHover: '#414141',
      hover: '#2e2e2e',
      main: '#212121',
      menu: '#333333',
      modal: '#3c3c3c',
      tertiary: '#3e3e3e',
    },
    border: {
      divider: '#85858580',
      focus: '#9568aa',
      light: '#939393',
      main: '#858585',
      subtle: '#85858533',
    },
    scrollbar: {
      menuThumb: '#5e5e5e',
      thumb: '#6d6d6d',
      track: '#212121',
    },
    status: {
      danger: '#e94749',
      dangerBg: '#e947491a',
      emote: '#9568aa',
      error: '#fbba37',
      errorAlpha: '#fbba3799',
      info: '#99c21d',
      mentionBg: '#8585851a',
      mentionBorder: '#858585',
      spoiler: '#5a5a5ac4',
      spoilerReveal: '#0000001a',
      warn: '#fbba37',
    },
    text: {
      code: '#e0e0e0',
      inverse: '#212121',
      muted: '#949494',
      nick: '#0099cc',
      primary: '#e0e0e0',
      secondary: '#e0e0e0',
      trip: '#626261',
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
