const Table = require('ascii-table');

/**
 * Render ASCII table
 *
 * @param {string} title
 * @param {TrafficMetricStorage} metricStorage
 * @return {string}
 */
module.exports = function renderTrafficMetric(title, metricStorage) {
  return `${(new Table()).fromJSON({
    title,
    heading: ['Method', 'Url', 'Size'],
    rows: metricStorage.getAll(),
  }).toString()}\n\n`;
};
