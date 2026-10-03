/**
 * Theme Name: Omega
 * Author: Matthew Madness
 * Description: The "omega" colour scheme from the legacy hack.chat client
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
      hover: '#01cf49',
      logoDark: '#151515',
      main: '#00bb00',
    },
    background: {
      alt: '#182222',
      element: '#17302f',
      elementHover: '#15403e',
      hover: '#172928',
      main: '#191919',
      menu: '#333333',
      modal: '#313d3d',
      tertiary: '#163b3a',
    },
    border: {
      divider: '#02fcf4',
      focus: '#00bb00',
      light: '#02fcf4',
      main: '#02fcf4',
      subtle: '#02fcf466',
    },
    scrollbar: {
      menuThumb: '#276563',
      thumb: '#107471',
      track: '#191919',
    },
    status: {
      danger: '#053ab7',
      dangerBg: '#053ab71a',
      emote: '#00bb00',
      error: '#007700',
      errorAlpha: '#00770099',
      info: '#00bb00',
      mentionBg: '#02fcf41a',
      mentionBorder: '#02fcf4',
      spoiler: '#125d5bc4',
      spoilerReveal: '#0000001a',
      warn: '#007700',
    },
    text: {
      code: '#02fcf4',
      inverse: '#191919',
      muted: '#0ba19c',
      nick: '#05b7b1',
      primary: '#02fcf4',
      secondary: '#02fcf4',
      trip: '#02fcf4',
      white: '#00dd00',
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
