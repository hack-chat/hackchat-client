/**
 * Export default port 3000 when there has been no port arguement passed
 */

const argv = require('./argv');

module.exports = parseInt(argv.port || process.env.PORT || '3000', 10);
