/**
 * Theme Name: Mocha
 * Description: The "mocha" colour scheme from the legacy hack.chat client
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
      hover: '#b4a9bd',
      logoDark: '#322b22',
      main: '#a89bb9',
    },
    background: {
      alt: '#41382e',
      element: '#4a4138',
      elementHover: '#544c43',
      hover: '#453d33',
      main: '#3b3228',
      menu: '#534636',
      modal: '#594d3d',
      tertiary: '#514940',
    },
    border: {
      divider: '#7e705a80',
      focus: '#a89bb9',
      light: '#8a7d6a',
      main: '#7e705a',
      subtle: '#7e705a33',
    },
    scrollbar: {
      menuThumb: '#72675a',
      thumb: '#776e67',
      track: '#3b3228',
    },
    status: {
      danger: '#cb6077',
      dangerBg: '#cb60771a',
      emote: '#a89bb9',
      error: '#f4bc87',
      errorAlpha: '#f4bc8799',
      info: '#beb55b',
      mentionBg: '#7e705a1a',
      mentionBorder: '#7e705a',
      spoiler: '#685f57c4',
      spoilerReveal: '#0000001a',
      warn: '#f4bc87',
    },
    text: {
      code: '#d0c8c6',
      inverse: '#3b3228',
      muted: '#948c87',
      nick: '#8ab3b5',
      primary: '#d0c8c6',
      secondary: '#d0c8c6',
      trip: '#645240',
      white: '#e9e1dd',
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
