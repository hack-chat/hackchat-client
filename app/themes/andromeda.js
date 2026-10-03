/**
 * Theme Name: Andromeda
 * Author: xyzpw
 * Description: The "andromeda" colour scheme from the legacy hack.chat client
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
      hover: '#918170',
      logoDark: '#464d68',
      main: '#cdb79f',
    },
    background: {
      alt: '#4f5775',
      element: '#4a526e',
      elementHover: '#454c66',
      hover: '#4d5572',
      main: '#525b7a',
      menu: '#515c70',
      modal: '#4d586b',
      tertiary: '#464e68',
    },
    border: {
      divider: '#563b3250',
      focus: '#cdb79f',
      light: '#040203',
      main: '#040203',
      subtle: '#563b3220',
    },
    scrollbar: {
      menuThumb: '#3e4655',
      thumb: '#33374a',
      track: '#525b7a',
    },
    status: {
      danger: '#d73737',
      dangerBg: '#d737371a',
      emote: '#cdb79f',
      error: '#ff6c6c',
      errorAlpha: '#ff6c6c99',
      info: '#06b449',
      mentionBg: '#563b321a',
      mentionBorder: '#563b32',
      spoiler: '#3b4056c4',
      spoilerReveal: '#0000001a',
      warn: '#ff6c6c',
    },
    text: {
      code: '#040203',
      inverse: '#525b7a',
      muted: '#232633',
      nick: '#cdb79f',
      primary: '#040203',
      secondary: '#040203',
      trip: '#040203',
      white: '#e8e4cf',
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
