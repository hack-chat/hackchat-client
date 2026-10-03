/**
 * Theme Name: Atelier Forest
 * Author: marzavec
 * Description: The "atelier-forest" colour scheme from the legacy hack.chat client
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
      hover: '#7a78d4',
      logoDark: '#171514',
      main: '#6666ea',
    },
    background: {
      alt: '#211e1d',
      element: '#292726',
      elementHover: '#33302f',
      hover: '#252321',
      main: '#1b1918',
      menu: '#2c2421',
      modal: '#322a27',
      tertiary: '#302d2c',
    },
    border: {
      divider: '#766e6b80',
      focus: '#6666ea',
      light: '#7e7673',
      main: '#766e6b',
      subtle: '#766e6b33',
    },
    scrollbar: {
      menuThumb: '#4b4341',
      thumb: '#534f4e',
      track: '#1b1918',
    },
    status: {
      danger: '#f22c40',
      dangerBg: '#f22c401a',
      emote: '#6666ea',
      error: '#d5911a',
      errorAlpha: '#d5911a99',
      info: '#5ab738',
      mentionBg: '#766e6b1a',
      mentionBorder: '#766e6b',
      spoiler: '#454241c4',
      spoilerReveal: '#0000001a',
      warn: '#d5911a',
    },
    text: {
      code: '#a8a19f',
      inverse: '#1b1918',
      muted: '#706b69',
      nick: '#407ee7',
      primary: '#a8a19f',
      secondary: '#a8a19f',
      trip: '#68615e',
      white: '#e6e2e0',
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
