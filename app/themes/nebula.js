/**
 * Theme Name: Nebula
 * Author: xyzpw
 * Description: The "nebula" colour scheme from the legacy hack.chat client
 */

const theme = {
  customCss: `
    body {
      background-color: #131114;
      background-image: radial-gradient(circle at top left, #23a1d377 5%, #dd6d7983, transparent);
      background-repeat: no-repeat;
      background-attachment: fixed;
    }
  `,
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
      hover: '#5c8d90',
      logoDark: '#100e11',
      main: '#83c9cd',
    },
    background: {
      alt: '#0000001a',
      element: '#00000033',
      elementHover: '#0000004d',
      hover: '#00000026',
      main: '#131114',
      menu: '#00000000',
      modal: '#121013',
      tertiary: '#00000040',
    },
    border: {
      divider: '#131114',
      focus: '#83c9cd',
      light: '#000000',
      main: '#000000',
      subtle: '#13111466',
    },
    scrollbar: {
      menuThumb: '#0e0d0f',
      thumb: '#0b0a0c',
      track: '#131114',
    },
    status: {
      danger: '#d73737',
      dangerBg: '#d737371a',
      emote: '#83c9cd',
      error: '#ff6c6c',
      errorAlpha: '#ff6c6c99',
      info: '#06b449',
      mentionBg: '#1311141a',
      mentionBorder: '#131114',
      spoiler: '#0d0c0ec4',
      spoilerReveal: '#0000001a',
      warn: '#ff6c6c',
    },
    text: {
      code: '#000000',
      inverse: '#131114',
      muted: '#080708',
      nick: '#83c9cd',
      primary: '#000000',
      secondary: '#000000',
      trip: '#9ea8b7',
      white: '#131114',
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
