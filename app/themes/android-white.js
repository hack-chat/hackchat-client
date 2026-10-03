/**
 * Theme Name: Android White
 * Author: MinusGix
 * Description: The "android-white" colour scheme from the legacy hack.chat client
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
      hover: '#000000',
      logoDark: '#d9d9d9',
      main: '#000000',
    },
    background: {
      alt: '#f5f5f5',
      element: '#e6e6e6',
      elementHover: '#d4d4d4',
      hover: '#ededed',
      main: '#ffffff',
      menu: '#ffffff',
      modal: '#f2f2f2',
      tertiary: '#d9d9d9',
    },
    border: {
      divider: '#dcdcdc',
      focus: '#000000',
      light: '#d9d9d9',
      main: '#ffffff',
      subtle: '#dcdcdc66',
    },
    scrollbar: {
      menuThumb: '#bfbfbf',
      thumb: '#999999',
      track: '#ffffff',
    },
    status: {
      danger: '#0387d1',
      dangerBg: '#0387d11a',
      emote: '#000000',
      error: '#ff5555',
      errorAlpha: '#ff555599',
      info: '#7d7d7d',
      mentionBg: '#1b1b1b1a',
      mentionBorder: '#1b1b1b',
      spoiler: '#b3b3b3c4',
      spoilerReveal: '#0000000d',
      warn: '#ff5555',
    },
    text: {
      code: '#000000',
      inverse: '#ffffff',
      muted: '#666666',
      nick: '#a3a3a3',
      primary: '#000000',
      secondary: '#000000',
      trip: '#dcdcdc',
      white: '#000000',
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
