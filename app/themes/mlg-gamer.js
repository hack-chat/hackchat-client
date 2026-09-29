/**
 * Theme Name: Epic Gamer MLG
 * Author: Marzavec
 * Github: https://github.com/marzavec
 * Description: xX_420_N0Sc0p3_Xx
 */

const theme = {
  customCss: `
    @font-face {
      font-family: 'Lacquer';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url('https://gateway.irys.xyz/EtDW8ns3LmydnytkExzeeUyPCy2RSttR4ogETJH2McEj') format('woff2');
    }

    body {
      cursor: crosshair !important;
    }

    body::before {
      content: '';
      position: fixed;
      background-image: url('https://gateway.irys.xyz/7UCQupVzB8VnW3YQQyVZtPu4dD7NUnHTf3Gnd4RLgwHj'); 
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      width: 150px; 
      height: 150px;
      opacity: 0.4;
      pointer-events: none;
      z-index: 9998;
      animation: 
        bounceX150 12.7s linear infinite alternate, 
        bounceY150 8.1s linear infinite alternate,
        mlgSpin 5s linear infinite;
    }

    body::after {
      content: '';
      position: fixed;
      background-image: url('https://gateway.irys.xyz/FfWHBGm7XnNr8rpCqY3ncrBwbBDHnWuRLEv3vw689Yej');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      width: 150px; 
      height: 150px;
      pointer-events: none;
      z-index: 9999;
      animation: 
        bounceX150 12.7s linear infinite alternate, 
        bounceY150 8.1s linear infinite alternate,
        mlgSpin 5s linear infinite,
        illumiFade 4s ease-in-out infinite;
    }

    html::before {
      content: '';
      position: fixed;
      background-image: url('https://gateway.irys.xyz/FWub3nncopM3ss8QuB28N6ZC3mzutGnwZ8XTQ7nwWsaF');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      width: 120px; 
      height: 120px;
      opacity: 0.4;
      pointer-events: none;
      z-index: 9997;
      transform-origin: bottom center;
      animation: 
        bounceX120 4.7s linear infinite alternate, 
        bounceY120 3.1s linear infinite alternate,
        dogeRock 0.5s ease-in-out infinite alternate;
    }

    .WelcomeStyle-sc-ifxd1s-0::before {
      content: '';
      display: block;
      width: 100%;
      height: 86px;
      max-height: 86px;
      margin: 0 auto;
      background-image: url('https://gateway.irys.xyz/CCVb6kwYvuVZj1kNBJywH1C7aEEC1jN3zjif6f9DfwM6');
      background-size: cover;
      background-position: center 30%;
      background-repeat: no-repeat;
      border-bottom: 4px solid #00ff00;
      box-shadow: 0 4px 15px #ff00ff80;
      margin-bottom: 1em;
      border-radius: 4px;
      z-index: 10;
      position: relative;
    }

    @keyframes mlgSpin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes dogeRock {
      0% { transform: rotate(-25deg); }
      100% { transform: rotate(25deg); }
    }

    @keyframes illumiFade {
      0% { opacity: 0; }
      40% { opacity: 0.6; }
      60% { opacity: 0.6; }
      100% { opacity: 0; }
    }

    @keyframes bounceX150 { 0% { left: 0; } 100% { left: calc(100vw - 150px); } }
    @keyframes bounceY150 { 0% { top: 0; } 100% { top: calc(100vh - 150px); } }
    
    @keyframes bounceX120 { 0% { left: 0; } 100% { left: calc(100vw - 120px); } }
    @keyframes bounceY120 { 0% { top: 0; } 100% { top: calc(100vh - 120px); } }

    a {
      display: inline-block;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.2s;
    }
    
    a:hover {
      transform: scale(1.5);
      color: #ff00ff !important;
      text-shadow: 0px 0px 8px #00ffff;
      z-index: 100;
      position: relative;
    }

    input:focus, textarea:focus {
      animation: rgbPulse 1s linear infinite;
      outline: none;
    }

    @keyframes rgbPulse {
      0% { box-shadow: 0 0 10px #ff0000; border-color: #ff0000; }
      33% { box-shadow: 0 0 10px #00ff00; border-color: #00ff00; }
      66% { box-shadow: 0 0 10px #0000ff; border-color: #0000ff; }
      100% { box-shadow: 0 0 10px #ff0000; border-color: #ff0000; }
    }
  `,
  padding: {
    chat: {
      firstChild: '0.8em',
      lastChild: '0.8em',
      msgSpacing: '0.5em',
    },
    mainMenu: {
      buttons: '0.6rem 0.3rem',
    },
  },
  palette: {
    accent: {
      hover: '#ff00ff',
      logoDark: '#1a0033',
      main: '#00ffff',
    },
    background: {
      alt: '#110022',
      element: '#220044',
      elementHover: '#330066',
      hover: '#1a0033',
      main: '#090011',
      menu: '#05000a',
      modal: '#1a0033',
      tertiary: '#2a0044',
    },
    border: {
      divider: '#ff00ff80',
      focus: '#00ff00',
      light: '#ff00ff',
      main: '#800080',
      subtle: '#00ffff33',
    },
    scrollbar: {
      menuThumb: '#ff00ff',
      thumb: '#00ffff',
      track: '#090011',
    },
    status: {
      danger: '#ff0000',
      dangerBg: '#ff000033',
      emote: '#ff00ff',
      error: '#ff0000',
      errorAlpha: '#ff000099',
      info: '#00ffff',
      mentionBg: '#00ff0033',
      mentionBorder: '#00ff00',
      spoiler: '#220044c4',
      spoilerReveal: '#00ff001a',
      warn: '#ff8c00',
    },
    text: {
      code: '#ff00ff',
      inverse: '#ffffff',
      muted: '#0088ff',
      primary: '#00ff00',
      secondary: '#00ffff',
      trip: '#ff8c00',
      white: '#ffffff',
    },
  },
  typography: {
    fontSize: '1em',
    letterSpacing: '1.25px',
    primary: '"Lacquer", "Comic Sans MS", cursive',
  },
};

export default theme;
