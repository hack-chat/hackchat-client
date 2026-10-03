/**
 * Theme Name: Carrot
 * Author: V9
 * Description: The "carrot" colour scheme from the legacy hack.chat client
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
      hover: '#6bcf04',
      logoDark: '#000000',
      main: '#33ff00',
    },
    background: {
      alt: '#0a0401',
      element: '#180a01',
      elementHover: '#281002',
      hover: '#110701',
      main: '#000000',
      menu: '#000000',
      modal: '#0c0501',
      tertiary: '#240e02',
    },
    border: {
      divider: '#ee600d',
      focus: '#33ff00',
      light: '#240e02',
      main: '#000000',
      subtle: '#ee600d66',
    },
    scrollbar: {
      menuThumb: '#3c1803',
      thumb: '#5f2605',
      track: '#000000',
    },
    status: {
      danger: '#ffffff',
      dangerBg: '#ffffff1a',
      emote: '#33ff00',
      error: '#ffbb00',
      errorAlpha: '#ffbb0099',
      info: '#ee600d',
      mentionBg: '#ee600d1a',
      mentionBorder: '#ee600d',
      spoiler: '#471d04c4',
      spoilerReveal: '#0000001a',
      warn: '#ffbb00',
    },
    text: {
      code: '#ee600d',
      inverse: '#000000',
      muted: '#8f3a08',
      nick: '#1db80f',
      primary: '#ee600d',
      secondary: '#ee600d',
      trip: '#7cbb81',
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
