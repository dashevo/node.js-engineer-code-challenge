const isEqual = require('lodash.isequal');
const hiResTime = require('hirestime');

const InvalidOutputDataError = require('./InvalidOutputDataError');
const TrafficMetricStorage = require('./TrafficMetricStorage');
const measureTrafficFactory = require('./measureTrafficFactory');
const calculateExpenses = require('./calculateExpenses');

/**
 * Call store and fetch actions and then output results
 *
 * @param {storeActionFactory} storeActionFactory
 * @param {fetchActionFactory} fetchActionFactory
 * @param {fetch} fetch
 * @param {object[]} inputData
 * @return {Promise<{ expenses, p2pTraffic, hostedTraffic, storeElapsedTime, fetchElapsedTime }>}
 */
async function runApplication(storeActionFactory, fetchActionFactory, fetch, inputData) {
  const p2pTraffic = new TrafficMetricStorage();
  const hostedTraffic = new TrafficMetricStorage();

  const p2pFetch = measureTrafficFactory(fetch, p2pTraffic);
  const hostedFetch = measureTrafficFactory(fetch, hostedTraffic);

  const storeAction = storeActionFactory(p2pFetch, hostedFetch);
  const fetchAction = fetchActionFactory(p2pFetch, hostedFetch);

  // Call store action
  const getStoreElapsedTime = hiResTime();
  await storeAction(inputData);
  const storeElapsedTime = getStoreElapsedTime();

  // Call fetch action
  const getFetchElapsedTime = hiResTime();
  const outputData = await fetchAction();
  const fetchElapsedTime = getFetchElapsedTime();

  if (!isEqual(inputData, outputData)) {
    throw new InvalidOutputDataError('Fetched data is not equal to input data');
  }

  // Calculate and output results
  const expenses = calculateExpenses(
    p2pTraffic,
    hostedTraffic,
    storeElapsedTime + fetchElapsedTime,
  );

  return {
    expenses,
    p2pTraffic,
    hostedTraffic,
    storeElapsedTime,
    fetchElapsedTime,
  };
}

module.exports = runApplication;
