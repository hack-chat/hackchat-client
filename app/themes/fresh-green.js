/**
 * Theme Name: Fresh Green
 * Author: ???
 * Description: The "fresh-green" colour scheme from the legacy hack.chat client
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
      hover: '#6dc7c2',
      logoDark: '#abddde',
      main: '#7ddad2',
    },
    background: {
      alt: '#b8e6e7',
      element: '#b1e1e2',
      elementHover: '#a9dcdd',
      hover: '#b5e4e5',
      main: '#bde9ea',
      menu: '#bde9ea',
      modal: '#b7e5e6',
      tertiary: '#abddde',
    },
    border: {
      divider: '#91e6e3',
      focus: '#7ddad2',
      light: '#86dbd9',
      main: '#91e6e3',
      subtle: '#91e6e366',
    },
    scrollbar: {
      menuThumb: '#9fd6d7',
      thumb: '#8dcacb',
      track: '#bde9ea',
    },
    status: {
      danger: '#74d8cc',
      dangerBg: '#74d8cc1a',
      emote: '#7ddad2',
      error: '#61cfcc',
      errorAlpha: '#61cfcc99',
      info: '#58cac2',
      mentionBg: '#65cfc51a',
      mentionBorder: '#65cfc5',
      spoiler: '#99d2d3c4',
      spoilerReveal: '#0000000d',
      warn: '#61cfcc',
    },
    text: {
      code: '#469c9d',
      inverse: '#bde9ea',
      muted: '#76bbbc',
      nick: '#58cac2',
      primary: '#469c9d',
      secondary: '#469c9d',
      trip: '#58cac2',
      white: '#74d8cc',
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
