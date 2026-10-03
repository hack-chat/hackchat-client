/**
 * Theme Name: Mariana
 * Description: The "mariana" colour scheme from the legacy hack.chat client
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
      hover: '#6a638d',
      logoDark: '#2c343c',
      main: '#594984',
    },
    background: {
      alt: '#38414a',
      element: '#3e474f',
      elementHover: '#444e55',
      hover: '#3b444c',
      main: '#343d46',
      menu: '#343d46',
      modal: '#39424b',
      tertiary: '#424c54',
    },
    border: {
      divider: '#657b8380',
      focus: '#594984',
      light: '#323b43',
      main: '#212932',
      subtle: '#657b8333',
    },
    scrollbar: {
      menuThumb: '#4c565d',
      thumb: '#5a656a',
      track: '#343d46',
    },
    status: {
      danger: '#387300',
      dangerBg: '#3873001a',
      emote: '#594984',
      error: '#edd400',
      errorAlpha: '#edd40099',
      info: '#3ea268',
      mentionBg: '#657b831a',
      mentionBorder: '#657b83',
      spoiler: '#515b61c4',
      spoilerReveal: '#0000001a',
      warn: '#edd400',
    },
    text: {
      code: '#93a1a1',
      inverse: '#343d46',
      muted: '#6d797d',
      nick: '#5d8cb7',
      primary: '#93a1a1',
      secondary: '#93a1a1',
      trip: '#586e75',
      white: '#7a8f94',
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
