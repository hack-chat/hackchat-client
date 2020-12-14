/**
 * Convert the passed process arguements into an object and export
 */

module.exports = require('minimist')(process.argv.slice(2));
