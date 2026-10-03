/**
 * Theme Name: Sunlight
 * Author: xyzpw
 * Description: The "sunlight" colour scheme from the legacy hack.chat client
 */

const theme = {
  customCss: `
    body {
      background-color: #8ac7f5;
      background-image: radial-gradient(circle at top left, #f9f9f8 2%, #f4c760 3%, #ff7f16);
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
      hover: '#813b94',
      logoDark: '#75a9d0',
      main: '#b854d4',
    },
    background: {
      alt: '#ffffff1a',
      element: '#ffffff33',
      elementHover: '#ffffff4d',
      hover: '#ffffff26',
      main: '#8ac7f5',
      menu: '#00000000',
      modal: '#83bde9',
      tertiary: '#ffffff40',
    },
    border: {
      divider: '#000000',
      focus: '#b854d4',
      light: '#000000',
      main: '#000000',
      subtle: '#00000066',
    },
    scrollbar: {
      menuThumb: '#6895b8',
      thumb: '#537793',
      track: '#8ac7f5',
    },
    status: {
      danger: '#d73737',
      dangerBg: '#d737371a',
      emote: '#b854d4',
      error: '#eb2902',
      errorAlpha: '#eb290299',
      info: '#60ac39',
      mentionBg: '#0000001a',
      mentionBorder: '#000000',
      spoiler: '#618bacc4',
      spoilerReveal: '#0000000d',
      warn: '#eb2902',
    },
    text: {
      code: '#000000',
      inverse: '#8ac7f5',
      muted: '#375062',
      nick: '#6684e1',
      primary: '#000000',
      secondary: '#000000',
      trip: '#6e6b5e',
      white: '#e8e4cf',
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
