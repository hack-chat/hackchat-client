/**
 * Theme Name: Lax
 * Author: Roslot
 * Description: The "lax" colour scheme from the legacy hack.chat client
 */

const theme = {
  customCss: `
    :root {
      color-scheme: dark;
      scrollbar-color: #8e8e8e #151515;
    }

    pre {
      background: #1d1f21 !important;
    }

    code {
      background: #444444;
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
      hover: '#b996b9',
      logoDark: '#121212',
      main: '#cc99cc',
    },
    background: {
      alt: '#1a1a1a',
      element: '#212121',
      elementHover: '#2a2a2a',
      hover: '#1d1d1d',
      main: '#151515',
      menu: '#111111',
      modal: '#171717',
      tertiary: '#272727',
    },
    border: {
      divider: '#7473691a',
      focus: '#cc99cc',
      light: '#31312f',
      main: '#20201e',
      subtle: '#7473690a',
    },
    scrollbar: {
      menuThumb: '#303030',
      thumb: '#454545',
      track: '#151515',
    },
    status: {
      danger: '#f2777a',
      dangerBg: '#f2777a1a',
      emote: '#cc99cc',
      error: '#ffcc66',
      errorAlpha: '#ffcc6699',
      info: '#3e9353',
      mentionBg: '#7473691a',
      mentionBorder: '#747369',
      spoiler: '#393939c4',
      spoilerReveal: '#0000001a',
      warn: '#ffcc66',
    },
    text: {
      code: '#8e8e8e',
      inverse: '#151515',
      muted: '#5e5e5e',
      nick: '#6699cc',
      primary: '#8e8e8e',
      secondary: '#8e8e8e',
      trip: '#515151',
      white: '#5c9c9f',
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
