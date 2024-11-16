/* eslint-disable no-console */

/**
 * Format express server errors and announce when the server is ready
 */

const divider = '\n-----------------------------------';

const logger = {
  // print errors
  error: err => {
    console.error(err);
  },

  // print when ready
  appStarted: (port, host, tunnelStarted) => {
    console.log('Server started!');

    // if the tunnel was requested, inform that it's ready
    if (tunnelStarted) {
      console.log('Tunnel initialised!');
    }

    // output app ready banner
    console.log(`
${'Access URLs:'}${divider}
Localhost: ${`http://${host}:${port}`}
      LAN: ${`http://127.0.0.1:${port}` +
        (tunnelStarted
          ? `\n    Proxy: ${tunnelStarted}`
          : '')}${divider}
Press ${'CTRL-C'} to stop. . .
    `);
  },
};

module.exports = logger;
