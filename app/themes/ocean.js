/**
 * Theme Name: Ocean
 * Description: The "ocean" colour scheme from the legacy hack.chat client
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
      hover: '#b89fb7',
      logoDark: '#252932',
      main: '#b48ead',
    },
    background: {
      alt: '#313641',
      element: '#3a3f4a',
      elementHover: '#444954',
      hover: '#353a45',
      main: '#2b303b',
      menu: '#343d46',
      modal: '#3b444d',
      tertiary: '#414651',
    },
    border: {
      divider: '#65737e80',
      focus: '#b48ead',
      light: '#737f8a',
      main: '#65737e',
      subtle: '#65737e33',
    },
    scrollbar: {
      menuThumb: '#575f68',
      thumb: '#676c76',
      track: '#2b303b',
    },
    status: {
      danger: '#bf616a',
      dangerBg: '#bf616a1a',
      emote: '#b48ead',
      error: '#ebcb8b',
      errorAlpha: '#ebcb8b99',
      info: '#a3be8c',
      mentionBg: '#65737e1a',
      mentionBorder: '#65737e',
      spoiler: '#585d67c4',
      spoilerReveal: '#0000001a',
      warn: '#ebcb8b',
    },
    text: {
      code: '#c0c5ce',
      inverse: '#2b303b',
      muted: '#848993',
      nick: '#8fa1b3',
      primary: '#c0c5ce',
      secondary: '#c0c5ce',
      trip: '#4f5b66',
      white: '#dfe1e8',
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
