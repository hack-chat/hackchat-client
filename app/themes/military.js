/**
 * Theme Name: Military
 * Author: marzavec
 * Description: The "military" colour scheme from the legacy hack.chat client
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
      hover: '#b9509e',
      logoDark: '#1a3001',
      main: '#b31e8d',
    },
    background: {
      alt: '#253e09',
      element: '#2f4615',
      elementHover: '#3b5022',
      hover: '#2a420f',
      main: '#1e3801',
      menu: '#132300',
      modal: '#1c2b0a',
      tertiary: '#374d1f',
    },
    border: {
      divider: '#666666',
      focus: '#b31e8d',
      light: '#747474',
      main: '#666666',
      subtle: '#66666666',
    },
    scrollbar: {
      menuThumb: '#404c32',
      thumb: '#617150',
      track: '#1e3801',
    },
    status: {
      danger: '#eb008a',
      dangerBg: '#eb008a1a',
      emote: '#b31e8d',
      error: '#f8ca12',
      errorAlpha: '#f8ca1299',
      info: '#04db24',
      mentionBg: '#6666661a',
      mentionBorder: '#666666',
      spoiler: '#50633cc4',
      spoilerReveal: '#0000001a',
      warn: '#f8ca12',
    },
    text: {
      code: '#c6c6c6',
      inverse: '#1e3801',
      muted: '#838d77',
      nick: '#04db24',
      primary: '#c6c6c6',
      secondary: '#c6c6c6',
      trip: '#132300',
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
