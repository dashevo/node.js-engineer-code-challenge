const P2P_TRAFFIC_FACTOR = 0.0001;
const HOSTED_TRAFFIC_FACTOR = 0.001;
const ELAPSED_TIME_FACTOR = 0.0000001;

/**
 * Calculate expenses
 *
 * @typedef calculateExpenses
 * @param {TrafficMetricStorage} p2pTraffic
 * @param {TrafficMetricStorage} hostedTraffic
 * @param {number} elapsedTime
 * @return number
 */
function calculateExpenses(p2pTraffic, hostedTraffic, elapsedTime) {
  return (p2pTraffic.getSummarySize() * P2P_TRAFFIC_FACTOR) +
    (hostedTraffic.getSummarySize() * HOSTED_TRAFFIC_FACTOR) +
    (elapsedTime * ELAPSED_TIME_FACTOR);
}

/**
 * @type {calculateExpenses & {HOSTED_TRAFFIC_FACTOR, P2P_TRAFFIC_FACTOR, ELAPSED_TIME_FACTOR}}
 */
module.exports = Object.assign(calculateExpenses, {
  HOSTED_TRAFFIC_FACTOR,
  P2P_TRAFFIC_FACTOR,
  ELAPSED_TIME_FACTOR,
});
