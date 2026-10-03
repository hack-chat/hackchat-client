/**
 * Theme Name: Chalk
 * Description: The "chalk" colour scheme from the legacy hack.chat client
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
      hover: '#dcb1e5',
      logoDark: '#121212',
      main: '#e1a3ee',
    },
    background: {
      alt: '#1c1c1c',
      element: '#282828',
      elementHover: '#353535',
      hover: '#222222',
      main: '#151515',
      menu: '#202020',
      modal: '#292929',
      tertiary: '#313131',
    },
    border: {
      divider: '#50505080',
      focus: '#e1a3ee',
      light: '#636363',
      main: '#505050',
      subtle: '#50505033',
    },
    scrollbar: {
      menuThumb: '#4c4c4c',
      thumb: '#606060',
      track: '#151515',
    },
    status: {
      danger: '#fb9fb1',
      dangerBg: '#fb9fb11a',
      emote: '#e1a3ee',
      error: '#ddb26f',
      errorAlpha: '#ddb26f99',
      info: '#acc267',
      mentionBg: '#5050501a',
      mentionBorder: '#505050',
      spoiler: '#4d4d4dc4',
      spoilerReveal: '#0000001a',
      warn: '#ddb26f',
    },
    text: {
      code: '#d0d0d0',
      inverse: '#151515',
      muted: '#858585',
      nick: '#6fc2ef',
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
