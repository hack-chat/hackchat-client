/**
 * Theme Name: Pop
 * Author: marzavec
 * Description: The "pop" colour scheme from the legacy hack.chat client
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
      logoDark: '#000000',
      main: '#b31e8d',
    },
    background: {
      alt: '#080808',
      element: '#151515',
      elementHover: '#232323',
      hover: '#0f0f0f',
      main: '#000000',
      menu: '#202020',
      modal: '#292929',
      tertiary: '#1f1f1f',
    },
    border: {
      divider: '#50505080',
      focus: '#b31e8d',
      light: '#636363',
      main: '#505050',
      subtle: '#50505033',
    },
    scrollbar: {
      menuThumb: '#4c4c4c',
      thumb: '#535353',
      track: '#000000',
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
      spoiler: '#3e3e3ec4',
      spoilerReveal: '#0000001a',
      warn: '#f8ca12',
    },
    text: {
      code: '#d0d0d0',
      inverse: '#000000',
      muted: '#7d7d7d',
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
