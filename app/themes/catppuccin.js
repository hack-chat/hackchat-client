/**
 * Theme Name: Catppuccin
 * Author: legendlife
 * Description: The "catppuccin" colour scheme from the legacy hack.chat client
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
      hover: '#c4adf9',
      logoDark: '#1a1a27',
      main: '#cba6f7',
    },
    background: {
      alt: '#242436',
      element: '#2d2e43',
      elementHover: '#383951',
      hover: '#29293d',
      main: '#1e1e2e',
      menu: '#1e1e2e',
      modal: '#262638',
      tertiary: '#35364d',
    },
    border: {
      divider: '#74c7ec',
      focus: '#cba6f7',
      light: '#b4befe',
      main: '#b4befe',
      subtle: '#74c7ec66',
    },
    scrollbar: {
      menuThumb: '#444662',
      thumb: '#5a5e81',
      track: '#1e1e2e',
    },
    status: {
      danger: '#f38ba8',
      dangerBg: '#f38ba81a',
      emote: '#cba6f7',
      error: '#f5e0dc',
      errorAlpha: '#f5e0dc99',
      info: '#cba6f7',
      mentionBg: '#89b4fa1a',
      mentionBorder: '#89b4fa',
      spoiler: '#4b4e6cc4',
      spoilerReveal: '#0000001a',
      warn: '#f5e0dc',
    },
    text: {
      code: '#b4befe',
      inverse: '#1e1e2e',
      muted: '#787eab',
      nick: '#b4befe',
      primary: '#b4befe',
      secondary: '#b4befe',
      trip: '#b7bdf8',
      white: '#cdd6f4',
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
