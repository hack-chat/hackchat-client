/**
 * Theme Name: Amoled
 * Description: The "amoled" colour scheme from the legacy hack.chat client
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
      hover: '#b085b4',
      logoDark: '#000000',
      main: '#b479c5',
    },
    background: {
      alt: '#070606',
      element: '#11100e',
      elementHover: '#1c1c18',
      hover: '#0c0b0a',
      main: '#000000',
      menu: '#000000',
      modal: '#080807',
      tertiary: '#191815',
    },
    border: {
      divider: '#404040',
      focus: '#b479c5',
      light: '#4f4f4b',
      main: '#404040',
      subtle: '#40404066',
    },
    scrollbar: {
      menuThumb: '#2a2923',
      thumb: '#424138',
      track: '#000000',
    },
    status: {
      danger: '#d73737',
      dangerBg: '#d737371a',
      emote: '#b479c5',
      error: '#cfb017',
      errorAlpha: '#cfb01799',
      info: '#97ca7d',
      mentionBg: '#4040401a',
      mentionBorder: '#404040',
      spoiler: '#32312ac4',
      spoilerReveal: '#0000001a',
      warn: '#cfb017',
    },
    text: {
      code: '#a6a28c',
      inverse: '#000000',
      muted: '#646154',
      nick: '#778fd8',
      primary: '#a6a28c',
      secondary: '#a6a28c',
      trip: '#6e6b5e',
      white: '#ffffff',
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
