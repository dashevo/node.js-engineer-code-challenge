const Table = require('ascii-table');
const chalk = require('chalk');
const coolFace = require('cool-ascii-faces');

const renderTrafficMetric = require('./renderTrafficMetric');

/**
 * Render results
 *
 * @param vars
 * @param vars.expenses
 * @param vars.storeElapsedTime
 * @param vars.fetchElapsedTime
 * @param vars.p2pTraffic
 * @param vars.hostedTraffic
 * @return {string}
 */
module.exports = async function renderResults(vars) {
  let template = '\nYour expenses: ';

  template += chalk.blueBright.bold(`${vars.expenses.toFixed(4)} DASH`);

  template += `   ${coolFace()}\n\n\n`;

  template += renderTrafficMetric('Requests to p2p service', vars.p2pTraffic);
  template += renderTrafficMetric('Requests to hosted service', vars.hostedTraffic);

  template += (new Table()).fromJSON({
    title: 'Elapsed time',
    heading: ['Action', 'Time'],
    rows: [
      ['store', `${(vars.storeElapsedTime / 1000).toFixed(2)} s`],
      ['fetch', `${(vars.fetchElapsedTime / 1000).toFixed(2)} s`],
    ],
  }).toString();

  return template;
};
