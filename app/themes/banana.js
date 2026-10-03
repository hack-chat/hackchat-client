/**
 * Theme Name: Banana
 * Author: marzavec
 * Description: The "banana" colour scheme from the legacy hack.chat client
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
      hover: '#7d1563',
      logoDark: '#d6cc00',
      main: '#b31e8d',
    },
    background: {
      alt: '#f2e600',
      element: '#e3d800',
      elementHover: '#d1c700',
      hover: '#eadf00',
      main: '#fcf000',
      menu: '#664000',
      modal: '#613d00',
      tertiary: '#d6cc00',
    },
    border: {
      divider: '#50505080',
      focus: '#b31e8d',
      light: '#444444',
      main: '#505050',
      subtle: '#50505033',
    },
    scrollbar: {
      menuThumb: '#4d3000',
      thumb: '#979000',
      track: '#fcf000',
    },
    status: {
      danger: '#eb008a',
      dangerBg: '#eb008a1a',
      emote: '#b31e8d',
      error: '#0419f9',
      errorAlpha: '#0419f999',
      info: '#37b349',
      mentionBg: '#5050501a',
      mentionBorder: '#505050',
      spoiler: '#b0a800c4',
      spoilerReveal: '#0000000d',
      warn: '#0419f9',
    },
    text: {
      code: '#000000',
      inverse: '#fcf000',
      muted: '#656000',
      nick: '#0e5a94',
      primary: '#000000',
      secondary: '#000000',
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
