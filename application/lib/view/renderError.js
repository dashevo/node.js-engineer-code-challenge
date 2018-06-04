const coolFace = require('cool-ascii-faces');
const chalk = require('chalk');

const InvalidOutputDataError = require('../InvalidOutputDataError');

/**
 * @param {Error} error
 * @return {string|Error}
 */
module.exports = function renderError(error) {
  if (error instanceof InvalidOutputDataError) {
    return chalk.bold.red(`${error.message}     ${coolFace()}`);
  }

  return error;
};
