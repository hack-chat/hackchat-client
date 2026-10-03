/**
 * Theme Name: Maniac
 * Author: marzavec
 * Description: The "maniac" colour scheme from the legacy hack.chat client
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
      hover: '#bc53a1',
      logoDark: '#1b0000',
      main: '#b31e8d',
    },
    background: {
      alt: '#270808',
      element: '#321515',
      elementHover: '#3e2323',
      hover: '#2c0f0f',
      main: '#200000',
      menu: '#900000',
      modal: '#930a0a',
      tertiary: '#3a1f1f',
    },
    border: {
      divider: '#50505080',
      focus: '#b31e8d',
      light: '#636363',
      main: '#505050',
      subtle: '#50505033',
    },
    scrollbar: {
      menuThumb: '#a03434',
      thumb: '#665353',
      track: '#200000',
    },
    status: {
      danger: '#eb008a',
      dangerBg: '#eb008a1a',
      emote: '#b31e8d',
      error: '#f8ca12',
      errorAlpha: '#f8ca1299',
      info: '#37b349',
      mentionBg: '#5050501a',
      mentionBorder: '#505050',
      spoiler: '#553e3ec4',
      spoilerReveal: '#0000001a',
      warn: '#f8ca12',
    },
    text: {
      code: '#d0d0d0',
      inverse: '#200000',
      muted: '#8a7d7d',
      nick: '#0e5a94',
      primary: '#d0d0d0',
      secondary: '#d0d0d0',
      trip: '#303030',
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
