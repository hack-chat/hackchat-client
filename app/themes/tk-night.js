/**
 * Theme Name: Tk Night
 * Author: anti.lol
 * Description: The "tk-night" colour scheme from the legacy hack.chat client
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
      hover: '#737093',
      logoDark: '#1a1d1f',
      main: '#55586d',
    },
    background: {
      alt: '#25272c',
      element: '#2e2f38',
      elementHover: '#393946',
      hover: '#2a2b32',
      main: '#1f2224',
      menu: '#0e0f10',
      modal: '#17171b',
      tertiary: '#363642',
    },
    border: {
      divider: '#cf56ff57',
      focus: '#55586d',
      light: '#694581',
      main: '#cf56ff57',
      subtle: '#cf56ff23',
    },
    scrollbar: {
      menuThumb: '#393647',
      thumb: '#5d5874',
      track: '#1f2224',
    },
    status: {
      danger: '#fd9652',
      dangerBg: '#fd96521a',
      emote: '#55586d',
      error: '#eba8a8',
      errorAlpha: '#eba8a899',
      info: '#d179d4',
      mentionBg: '#5b346f1a',
      mentionBorder: '#5b346f',
      spoiler: '#4d4a60c4',
      spoilerReveal: '#0000001a',
      warn: '#eba8a8',
    },
    text: {
      code: '#b9a8eb',
      inverse: '#1f2224',
      muted: '#7b729b',
      nick: '#55586d',
      primary: '#b9a8eb',
      secondary: '#b9a8eb',
      trip: '#7b80a3',
      white: '#97ff97ef',
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
