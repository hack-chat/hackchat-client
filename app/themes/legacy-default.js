/**
 * Theme Name: Legacy Default
 * Author: marzavec
 * Description: The "default" colour scheme from the legacy hack.chat client
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
      hover: '#b590ae',
      logoDark: '#121212',
      main: '#aa759f',
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
      focus: '#aa759f',
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
      danger: '#ac4142',
      dangerBg: '#ac41421a',
      emote: '#aa759f',
      error: '#f4bf75',
      errorAlpha: '#f4bf7599',
      info: '#90a959',
      mentionBg: '#5050501a',
      mentionBorder: '#505050',
      spoiler: '#4d4d4dc4',
      spoilerReveal: '#0000001a',
      warn: '#f4bf75',
    },
    text: {
      code: '#d0d0d0',
      inverse: '#151515',
      muted: '#858585',
      nick: '#6a9fb5',
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
