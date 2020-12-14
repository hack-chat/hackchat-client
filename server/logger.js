/* eslint-disable no-console */

/**
 * Format express server errors and announce when the server is ready
 */

const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n-----------------------------------');

const logger = {
  // print errors
  error: err => {
    console.error(chalk.red(err));
  },

  // print when ready
  appStarted: (port, host, tunnelStarted) => {
    console.log(chalk.green('Server started!'));

    // if the tunnel was requested, inform that it's ready
    if (tunnelStarted) {
      console.log(chalk.green('Tunnel initialised!'));
    }

    // output app ready banner
    console.log(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`) +
        (tunnelStarted
          ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}`
          : '')}${divider}
Press ${chalk.italic('CTRL-C')} to stop. . .
    `);
  },
};

module.exports = logger;
