/**
 * Theme Name: Solarized
 * Author: marzavec
 * Description: The "solarized" colour scheme from the legacy hack.chat client
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
      hover: '#787fba',
      logoDark: '#00252e',
      main: '#6c71c4',
    },
    background: {
      alt: '#06303a',
      element: '#0f3741',
      elementHover: '#193f48',
      hover: '#0a333d',
      main: '#002b36',
      menu: '#073642',
      modal: '#0e3b47',
      tertiary: '#163d46',
    },
    border: {
      divider: '#657b8380',
      focus: '#6c71c4',
      light: '#6c8188',
      main: '#657b83',
      subtle: '#657b8333',
    },
    scrollbar: {
      menuThumb: '#2a515a',
      thumb: '#3b5a61',
      track: '#002b36',
    },
    status: {
      danger: '#dc322f',
      dangerBg: '#dc322f1a',
      emote: '#6c71c4',
      error: '#b58900',
      errorAlpha: '#b5890099',
      info: '#859900',
      mentionBg: '#657b831a',
      mentionBorder: '#657b83',
      spoiler: '#2c4e56c4',
      spoilerReveal: '#0000001a',
      warn: '#b58900',
    },
    text: {
      code: '#93a1a1',
      inverse: '#002b36',
      muted: '#587276',
      nick: '#268bd2',
      primary: '#93a1a1',
      secondary: '#93a1a1',
      trip: '#586e75',
      white: '#eee8d5',
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
