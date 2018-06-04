const isEqual = require('lodash.isequal');
const fetch = require('node-fetch');
const hiResTime = require('hirestime');

const InvalidOutputDataError = require('./InvalidOutputDataError');
const TrafficMetricStorage = require('./TrafficMetricStorage');
const measureTrafficFactory = require('./measureTrafficFactory');
const calculateExpenses = require('./calculateExpenses');

const fetchActionFactory = require('../actions/fetchActionFactory');
const storeActionFactory = require('../actions/storeActionFactory');

/**
 * Call store and fetch actions and then output results
 *
 * @return {Promise<object>}
 */
module.exports = async function runApplication() {
  const p2pTraffic = new TrafficMetricStorage();
  const hostedTraffic = new TrafficMetricStorage();

  const p2pFetch = measureTrafficFactory(fetch, p2pTraffic);
  const hostedFetch = measureTrafficFactory(fetch, hostedTraffic);

  const storeAction = storeActionFactory(p2pFetch, hostedFetch);
  const fetchAction = fetchActionFactory(p2pFetch, hostedFetch);

  // eslint-disable-next-line global-require
  const inputData = require('../data');

  // Call store action
  const getStoreElapsedTime = hiResTime();
  await storeAction(inputData);
  const storeActionElapsedTime = getStoreElapsedTime();

  // Call fetch action
  const getFetchElapsedTime = hiResTime();
  const outputData = await fetchAction();
  const fetchActionElapsedTime = getFetchElapsedTime();

  if (!isEqual(inputData, outputData)) {
    throw new InvalidOutputDataError('Fetched data is not equal to input data');
  }

  // Calculate and output results
  const expenses = calculateExpenses(
    p2pTraffic,
    hostedTraffic,
    storeActionElapsedTime + fetchActionElapsedTime,
  );

  return {
    expenses,
    p2pTraffic,
    hostedTraffic,
    storeActionElapsedTime,
    fetchActionElapsedTime,
  };
};
