/**
 * Theme Name: Eighties
 * Author: marzavec
 * Description: The "eighties" colour scheme from the legacy hack.chat client
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
      hover: '#ceaacb',
      logoDark: '#262626',
      main: '#cc99cc',
    },
    background: {
      alt: '#343433',
      element: '#3e3d3d',
      elementHover: '#494947',
      hover: '#393838',
      main: '#2d2d2d',
      menu: '#393939',
      modal: '#414140',
      tertiary: '#464544',
    },
    border: {
      divider: '#74736980',
      focus: '#cc99cc',
      light: '#828177',
      main: '#747369',
      subtle: '#74736933',
    },
    scrollbar: {
      menuThumb: '#605f5d',
      thumb: '#6f6e6b',
      track: '#2d2d2d',
    },
    status: {
      danger: '#f2777a',
      dangerBg: '#f2777a1a',
      emote: '#cc99cc',
      error: '#ffcc66',
      errorAlpha: '#ffcc6699',
      info: '#99cc99',
      mentionBg: '#7473691a',
      mentionBorder: '#747369',
      spoiler: '#5f5e5cc4',
      spoilerReveal: '#0000001a',
      warn: '#ffcc66',
    },
    text: {
      code: '#d3d0c8',
      inverse: '#2d2d2d',
      muted: '#918f8a',
      nick: '#6699cc',
      primary: '#d3d0c8',
      secondary: '#d3d0c8',
      trip: '#515151',
      white: '#e8e6df',
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
