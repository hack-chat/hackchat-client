/**
 * Theme Name: Monokai
 * Description: The "monokai" colour scheme from the legacy hack.chat client
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
      hover: '#c4a5fb',
      logoDark: '#21221d',
      main: '#ae81ff',
    },
    background: {
      alt: '#2f302a',
      element: '#3c3d37',
      elementHover: '#4b4b45',
      hover: '#363731',
      main: '#272822',
      menu: '#383830',
      modal: '#42423a',
      tertiary: '#464741',
    },
    border: {
      divider: '#75715e80',
      focus: '#ae81ff',
      light: '#898574',
      main: '#75715e',
      subtle: '#75715e33',
    },
    scrollbar: {
      menuThumb: '#686861',
      thumb: '#7b7b75',
      track: '#272822',
    },
    status: {
      danger: '#f92672',
      dangerBg: '#f926721a',
      emote: '#ae81ff',
      error: '#f4bf75',
      errorAlpha: '#f4bf7599',
      info: '#a6e22e',
      mentionBg: '#75715e1a',
      mentionBorder: '#75715e',
      spoiler: '#666660c4',
      spoilerReveal: '#0000001a',
      warn: '#f4bf75',
    },
    text: {
      code: '#f8f8f2',
      inverse: '#272822',
      muted: '#a4a59f',
      nick: '#66d9ef',
      primary: '#f8f8f2',
      secondary: '#f8f8f2',
      trip: '#49483e',
      white: '#f5f4f1',
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
