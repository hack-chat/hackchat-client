/**
 * Theme Name: Hacker
 * Author: Marzavec
 * Github: https://github.com/marzavec
 * Description: A terminal-inspired dark mode featuring deep blacks and neon greens
 */

const theme = {
  palette: {
    background: {
      main: '#000000',
      menu: '#050505',
      modal: '#0a0a0a',
      element: '#001a00',
      elementHover: '#003300',
      tertiary: '#002200',
      alt: '#080808',
      hover: '#001100',
    },
    text: {
      primary: '#00ff41',
      secondary: '#008f11',
      muted: '#005500',
      white: '#ffffff',
      inverse: '#000000',
      trip: '#004400',
      code: '#00ff41',
    },
    border: {
      main: '#003b00',
      light: '#005500',
      focus: '#00ff41',
      subtle: '#00ff4133',
      divider: '#00ff4180',
    },
    accent: {
      main: '#00ff41',
      hover: '#5cff86',
      logoDark: '#001100',
    },
    status: {
      info: '#00ffff',
      warn: '#ffff00',
      error: '#ff0000',
      mentionBg: '#00ff411a',
      mentionBorder: '#00ff41',
      danger: '#ff0000',
      dangerBg: '#ff00001a',
      errorAlpha: '#ff000099',
      emote: '#ff00ff',
      spoiler: '#001a00c4',
      spoilerReveal: '#00ff411a',
    },
    scrollbar: {
      track: '#000000',
      thumb: '#003b00',
      menuThumb: '#002200',
    },
  },
};

export default theme;
