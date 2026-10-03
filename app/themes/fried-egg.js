/**
 * Theme Name: Fried Egg
 * Author: bujijam
 * Description: The "fried-egg" colour scheme from the legacy hack.chat client
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
      hover: '#b35600',
      logoDark: '#d2d2d2',
      main: '#ff7b00',
    },
    background: {
      alt: '#ededed',
      element: '#dedede',
      elementHover: '#cdcdcd',
      hover: '#e6e6e6',
      main: '#f7f7f7',
      menu: '#ffcc26',
      modal: '#f2c224',
      tertiary: '#d2d2d2',
    },
    border: {
      divider: '#92792699',
      focus: '#ff7b00',
      light: '#884626',
      main: '#a0522d',
      subtle: '#9279263d',
    },
    scrollbar: {
      menuThumb: '#bf991d',
      thumb: '#949494',
      track: '#f7f7f7',
    },
    status: {
      danger: '#ff632a',
      dangerBg: '#ff632a1a',
      emote: '#ff7b00',
      error: '#ff0000',
      errorAlpha: '#ff000099',
      info: '#a37939',
      mentionBg: '#9279261a',
      mentionBorder: '#927926',
      spoiler: '#adadadc4',
      spoilerReveal: '#0000000d',
      warn: '#ff0000',
    },
    text: {
      code: '#000000',
      inverse: '#f7f7f7',
      muted: '#636363',
      nick: '#ffd700',
      primary: '#000000',
      secondary: '#000000',
      trip: '#8b8263',
      white: '#000000',
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
