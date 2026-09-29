/**
 * Theme Name: Hacker
 * Author: Marzavec
 * Github: https://github.com/marzavec
 * Description: A terminal-inspired dark mode featuring deep blacks and neon greens
 */

const theme = {
  customCss: `
    @font-face {
      font-family: 'Tiny5';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url('https://gateway.irys.xyz/GQ9hhET91MYJutkpvapQSAca113ufscMEmHKz5M4oLTH') format('woff2');
    }

    html::before, body::before, body::after {
      content: '';
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background-repeat: repeat; 
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cstyle%3Etext%7Bfont-family:monospace;font-size:15px;fill:%23008f11;%7D.g%7Bfill:%2300ff41;text-shadow:0 0 5px %2300ff41;%7D.w%7Bfill:%23e0ffe5;text-shadow:0 0 5px %23ffffff;%7D%3C/style%3E%3Ctext x='5' y='20'%3E1%3C/text%3E%3Ctext x='5' y='40'%3E0%3C/text%3E%3Ctext x='5' y='60' class='w'%3E1%3C/text%3E%3Ctext x='30' y='50'%3E0%3C/text%3E%3Ctext x='30' y='70'%3E1%3C/text%3E%3Ctext x='30' y='90' class='g'%3E0%3C/text%3E%3Ctext x='55' y='10'%3E1%3C/text%3E%3Ctext x='55' y='30'%3E1%3C/text%3E%3Ctext x='55' y='50' class='g'%3E0%3C/text%3E%3Ctext x='80' y='80'%3E0%3C/text%3E%3Ctext x='80' y='100'%3E0%3C/text%3E%3Ctext x='80' y='120' class='w'%3E1%3C/text%3E%3Ctext x='105' y='40'%3E1%3C/text%3E%3Ctext x='105' y='60'%3E0%3C/text%3E%3Ctext x='105' y='80' class='g'%3E1%3C/text%3E%3Ctext x='130' y='90'%3E0%3C/text%3E%3Ctext x='130' y='110'%3E1%3C/text%3E%3Ctext x='130' y='130' class='g'%3E0%3C/text%3E%3C/svg%3E");
      pointer-events: none; 
      z-index: 0;
    }

    html::before {
      background-size: 80px;
      opacity: 0.08;
      animation: matrixScroll 45s linear infinite;
    }

    body::before {
      background-size: 150px;
      opacity: 0.12;
      animation: matrixScroll 30s linear infinite;
    }

    body::after {
      background-size: 200px;
      opacity: 0.15;
      animation: matrixScroll 20s linear infinite;
    }

    @keyframes matrixScroll {
      0% { background-position: 0 0; }
      100% { background-position: 0 1200px; }
    }

    #root {
      position: relative;
      z-index: 1;
    }

    input, textarea {
      caret-color: #00ff41 !important;
      caret-shape: block !important;
    }

    ::selection {
      background: #00ff41 !important;
      color: #000000 !important;
    }
    ::-moz-selection {
      background: #00ff41 !important;
      color: #000000 !important;
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
      hover: '#5cff86',
      logoDark: '#001100',
      main: '#00ff41',
    },
    background: {
      alt: '#080808',
      element: '#001a00',
      elementHover: '#003300',
      hover: '#001100',
      main: '#000000',
      menu: '#050505',
      modal: '#0a0a0a',
      tertiary: '#002200',
    },
    border: {
      divider: '#00ff4180',
      focus: '#00ff41',
      light: '#005500',
      main: '#003b00',
      subtle: '#00ff4133',
    },
    scrollbar: {
      menuThumb: '#002200',
      thumb: '#003b00',
      track: '#000000',
    },
    status: {
      danger: '#ff0000',
      dangerBg: '#ff00001a',
      emote: '#ff00ff',
      error: '#ff0000',
      errorAlpha: '#ff000099',
      info: '#00ffff',
      mentionBg: '#00ff411a',
      mentionBorder: '#00ff41',
      spoiler: '#001a00c4',
      spoilerReveal: '#00ff411a',
      warn: '#ffff00',
    },
    text: {
      code: '#00ff41',
      inverse: '#000000',
      muted: '#005500',
      primary: '#00ff41',
      secondary: '#008f11',
      trip: '#004400',
      white: '#ffffff',
    },
  },
  typography: {
    fontSize: '0.75em',
    letterSpacing: '1.5px',
    primary: '"Tiny5", monospace',
  },
};

export default theme;
